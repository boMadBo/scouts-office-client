import mongoose from 'mongoose';

const TasksSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      unique: true,
    },
    completed: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Task', TasksSchema);
