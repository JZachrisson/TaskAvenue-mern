import { Document } from 'mongoose';

export interface ITodoList extends Document {
  name: string;
  listId: string;
  creator: string;
  items: unknown[];
}
