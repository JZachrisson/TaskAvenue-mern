// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import express, { Express } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app: Express = express();
const PORT: string | number = process.env.PORT || 8080;

const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.ki71t.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.set('useFindAndModify', false);

mongoose
  .connect(uri, options)
  .then(() => console.log('DB connection successful'))
  .catch((error) => {
    throw error;
  });

app.get('/', (_, res) => {
  res.status(200).send('OK');
});
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
