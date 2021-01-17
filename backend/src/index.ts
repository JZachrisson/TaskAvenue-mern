/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
import express, { Express } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Pusher = require('pusher');
import bodyParser from 'body-parser';

const app: Express = express();
const PORT: string | number = process.env.PORT || 8080;

import todoListsRoutes from './routes/todoLists.routes';
import todoItemsRoutes from './routes/todoItems.routes';
import authRoutes from './routes/auth.routes';

const corsOptions = {
  origin: 'https://taskavenue.web.app',
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/todolists', todoListsRoutes);
app.use('/api/todoitems', todoItemsRoutes);

const pusher = new Pusher({
  appId: process.env.PUSHER_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.ki71t.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB Connected!!');
  })
  .catch((err) => {
    console.log(Error, err.message);
  });

const db = mongoose.connection;

db.once('open', () => {
  const listCollection = db.collection('todolists');
  const listChangeStream = listCollection.watch();

  listChangeStream.on('change', (change) => {
    if (change.operationType === 'update') {
      const values = Object.values(change.updateDescription.updatedFields);
      console.log('something updated');
      pusher.trigger('todolists', 'updated', {
        documentId: change.documentKey._id,
        itemId: values[0],
      });
    } else {
      console.log('Error triggering pusher');
      return;
    }
  });

  const itemsCollection = db.collection('todoitems');
  const itemsChangeStream = itemsCollection.watch();

  itemsChangeStream.on('change', (change) => {
    if (change.operationType === 'delete') {
      pusher.trigger('todoitems', 'deleted', {
        itemId: change.documentKey._id,
      });
    } else if (change.operationType === 'update') {
      pusher.trigger('todoitems', 'updated', {
        itemId: change.documentKey._id,
      });
    } else {
      console.log('Error triggering pusher');
      return;
    }
  });
});

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
