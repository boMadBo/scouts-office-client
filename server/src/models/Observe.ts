import mongoose from 'mongoose';

const OnserveSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  id: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Observe', OnserveSchema);
