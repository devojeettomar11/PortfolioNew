import Enquiry from "../models/Enquiry.js";

export const createEnquiry = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const enquiry = await Enquiry.create({ name, email, phone, message });

    res.status(201).json({
      message: "Enquiry submitted successfully",
      enquiry
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) return res.status(404).json({ message: "Enquiry not found" });

    await enquiry.deleteOne();
    res.json({ message: "Enquiry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const toggleStatus = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) return res.status(404).json({ message: "Enquiry not found" });

    enquiry.status = enquiry.status === "Unread" ? "Read" : "Unread";
    await enquiry.save();

    res.json({ message: "Status updated", enquiry });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
