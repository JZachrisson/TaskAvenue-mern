import { Document } from 'mongoose';

export interface ITodoList extends Document {
  name: string;
  listId: string;
  creator: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  items: object[];
}
