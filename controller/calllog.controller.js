// controller/calllog.controller.js
import CallLog from '../model/calllog.model.js';

export async function createCallLog(req, res) {
  try {
    const log = await CallLog.create(req.body);
    res.status(201).json(log);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function listCallLogsByCustomer(req, res) {
  try {
    const { customerId } = req.params;
    const logs = await CallLog.find({ customerId }).sort({ timestamp: -1 });
    res.json(logs);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
