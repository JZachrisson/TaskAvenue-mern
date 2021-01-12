import { ITodoItem } from '../types/todoItem';
import { model, Schema } from 'mongoose';

const todoItemSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    listId: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
    },
    status: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<ITodoItem>('TodoItem', todoItemSchema);
