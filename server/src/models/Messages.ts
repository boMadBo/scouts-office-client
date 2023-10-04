import mongoose from 'mongoose';

const MessagesSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
    },
    sender: {
      type: String,
    },
    text: {
      type: String,
    },
<<<<<<< HEAD
    isReaded: {
      type: Boolean,
    },
=======
>>>>>>> main
  },
  { timestamps: true }
);

export default mongoose.model('Messages', MessagesSchema);
