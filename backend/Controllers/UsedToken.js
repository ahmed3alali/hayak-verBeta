import mongoose from 'mongoose';

const usedTokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  usedAt: { type: Date, default: Date.now },
});

const UsedToken = mongoose.model('UsedToken', usedTokenSchema);
export default UsedToken;
