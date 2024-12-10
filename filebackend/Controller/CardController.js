import Card from '../Modules/CardModule.js';

// Get All Cards
export const getCard = async (req, res) => {
    try {
        const cards = await Card.find();
        res.status(200).json(cards);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a Single Card by ID
export const getcardById = async (req, res) => {
    try {
        const card = await Card.findById(req.params.id);
        if (!card) return res.status(404).json({ message: 'Card not found' });
        res.json(card);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching card', error: err.message });
    }
};

// Create a New Card
export const createCard = async (req, res) => {
    const card = new Card({
        id: req.body.id,
        name: req.body.name,
        icon: req.body.icon,
        percentage: req.body.percentage,
        amount: req.body.amount,
        active: req.body.active,
        color: req.body.color,
    });

    try {
        const newCard = await card.save();
        res.status(201).json(newCard);
    } catch (err) {
        res.status(400).json({ message: 'Error saving card', error: err.message });
    }
};

// Update a Card
export const updateCard = async (req, res) => {
    try {
        const updatedCard = await Card.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                icon: req.body.icon,
                percentage: req.body.percentage,
                amount: req.body.amount,
                active: req.body.active,
                color: req.body.color,
            },
            { new: true }
        );
        if (!updatedCard) return res.status(404).json({ message: 'Card not found' });
        res.json(updatedCard);
    } catch (err) {
        res.status(400).json({ message: 'Error updating card', error: err.message });
    }
};

// Delete a Card
export const deleteCard = async (req, res) => {
    try {
        const deletedCard = await Card.findByIdAndDelete(req.params.id);
        if (!deletedCard) return res.status(404).json({ message: 'Card not found' });
        res.json({ message: 'Card deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting card', error: err.message });
    }
};
