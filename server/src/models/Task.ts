import mongoose from 'mongoose';

const TasksSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },

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
