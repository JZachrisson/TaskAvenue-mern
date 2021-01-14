import { ITodoList } from '../types/todoList';
import { model, Schema, Types } from 'mongoose';

const todoListSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    listId: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
      required: true,
    },
    items: [{ type: Types.ObjectId, ref: 'TodoItem' }],
  },
  { timestamps: true }
);

export default model<ITodoList>('TodoList', todoListSchema);
