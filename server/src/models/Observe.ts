import mongoose from 'mongoose';

const OnserveSchema = new mongoose.Schema({
<<<<<<< HEAD
  id: {
    type: String,
    required: true,
    unique: true,
=======
  userId: {
    type: String,
  },
  id: {
    type: String,
    required: true,
>>>>>>> main
  },
});

export default mongoose.model('Observe', OnserveSchema);
