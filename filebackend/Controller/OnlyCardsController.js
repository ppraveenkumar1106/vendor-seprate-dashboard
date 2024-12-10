import { v4 as uuidv4 } from 'uuid';
import OnlyCards from "../Modules/OnlyCardsModule.js"; 

// Create a new OnlyCard
export const createOnlyCard = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required." });
    }

    const newOnlyCard = {
      title: req.body.title,
      price: parseFloat(req.body.price),
      description: req.body.description,
      img: `/assets/${req.file.filename}`,
      id: uuidv4()
    };

    const createdOnlyCard = await OnlyCards.create(newOnlyCard);
    res.status(201).json(createdOnlyCard);
  } catch (error) {
    console.error('Error creating OnlyCard:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get all OnlyCards
export const getOnlyCards = async (req, res) => {
  try {
    const onlyCards = await OnlyCards.find();
    res.json(onlyCards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get OnlyCard by ID
export const getOnlyCardById = async (req, res) => {
  try {
    const onlyCard = await OnlyCards.findById(req.params.id);
    if (!onlyCard) {
      return res.status(404).json({ error: "OnlyCard not found" });
    }
    res.json(onlyCard);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve OnlyCard: " + err.message });
  }
};

// Update OnlyCard by ID
export const updateOnlyCard = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      updateData.img = `/assets/${req.file.filename}`;
    }

    const updatedOnlyCard = await OnlyCards.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedOnlyCard) {
      return res.status(404).json({ error: "OnlyCard not found" });
    }
    res.json(updatedOnlyCard);
  } catch (err) {
    res.status(500).json({ error: "Failed to update OnlyCard: " + err.message });
  }
};

// Delete OnlyCard by ID
export const deleteOnlyCard = async (req, res) => {
  try {
    const deletedOnlyCard = await OnlyCards.findByIdAndDelete(req.params.id);
    if (!deletedOnlyCard) {
      return res.status(404).json({ error: "OnlyCard not found" });
    }
    res.json({ message: 'OnlyCard deleted successfully' });
  } catch (error) {
    console.error('Error deleting OnlyCard:', error);
    res.status(500).json({ error: "Failed to delete OnlyCard: " + error.message });
  }
};
