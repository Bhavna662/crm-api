import mongoose from 'mongoose';
const CallLogSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  timestamp: { type: Date, default: Date.now },
  direction: { type: String, enum: ['inbound', 'outbound'], required: true },
  duration: Number,
  notes: String
});
export default mongoose.model('CallLog', CallLogSchema);
