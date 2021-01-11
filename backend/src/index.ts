// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import express, { Express } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Pusher = require('pusher');

const app: Express = express();
const PORT: string | number = process.env.PORT || 8080;

const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pusher = new Pusher({
  appId: process.env.PUSHER_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.ki71t.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.set('useFindAndModify', false);

mongoose
  .connect(uri, options)
  .then(() => console.log('DB connection successful'))
  .catch((error) => {
    throw error;
  });

const db = mongoose.connection;

db.once('open', () => {
  const listCollection = db.collection('todolists');
  const changeStream = listCollection.watch();

  changeStream.on('change', (change) => {
    if (change.operationType === 'update') {
      const values = Object.values(change.updateDescription.updatedFields);
      console.log('something updated');
      pusher.trigger('todolists', 'updated', {
        documentId: change.documentKey._id,
        itemId: values[0],
      });
    } else {
      console.log('Error triggering pusher');
    }
  });
});

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
