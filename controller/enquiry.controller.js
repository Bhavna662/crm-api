import Enquiry from "../model/enquiry.model.js";

// Create new enquiry
export const create = async (req, res) => {
  try {
    const enquiry = await Enquiry.create(req.body);
    res.status(201).json(enquiry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// List all enquiries
export const list = async (req, res) => {
  try {
    const enquiries = await Enquiry.find()
      .populate("assignedTo", "fullname email")
      .sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single enquiry
export const getById = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id)
      .populate("assignedTo", "fullname email");
    if (!enquiry) return res.status(404).json({ error: "Not found" });
    res.json(enquiry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update enquiry
export const update = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate("assignedTo", "fullname email");
    if (!enquiry) return res.status(404).json({ error: "Not found" });
    res.json(enquiry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete enquiry
export const remove = async (req, res) => {
  try {
    await Enquiry.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
