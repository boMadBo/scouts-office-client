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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> a40623b (add messages logic)
=======

>>>>>>> 9b4e008 (add dialogs)
=======

>>>>>>> main
  },
  { timestamps: true }
);

export default mongoose.model('Messages', MessagesSchema);
