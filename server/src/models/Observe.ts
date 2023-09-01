import mongoose from 'mongoose';

const OnserveSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model('Observe', OnserveSchema);
