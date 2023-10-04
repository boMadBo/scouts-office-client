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
    isReaded: {
      type: Boolean,
    },

  },
  { timestamps: true }
);

export default mongoose.model('Messages', MessagesSchema);
