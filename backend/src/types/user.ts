import { Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  id: string;
  _id: string;
}
