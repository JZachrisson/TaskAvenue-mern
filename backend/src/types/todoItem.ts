import { Document } from 'mongoose';

export interface ITodoItem extends Document {
  name: string;
  description: string;
  listId: string;
  creator: string;
  status: boolean;
}
