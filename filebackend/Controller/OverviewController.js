import Overview from '../Modules/OverviewModules.js';

// Get all overview items
export const getAllOverviews = async (req, res) => {
  try {
    const overviews = await Overview.find(); 
    res.status(200).json(overviews); 
  } catch (error) {
    res.status(500).json({ message: "Error fetching overviews", error: error.message });
  }
};

export const getOverviewById = async (req, res) => {
  try {
    const overview = await Overview.findById(req.params.id);
    if (!overview) {
      return res.status(404).json({ error: "Overview not found" });
    }
    res.json(overview);
  } catch (err) {
    res.status(404).json({ error: "Overview not found" });
  }
};

export const createOverview = async (req, res) => {
  try {
    const newItem = new Overview({
      customer: req.body.customer,
      product: req.body.product,
      price: req.body.price,
      status: req.body.status,
      action: req.body.action,
      number: req.body.number, 
      Edit: req.body.Edit || '', 
    });

    const createdItem = await newItem.save();
    res.status(201).json(createdItem);
  } catch (error) {
    console.error("Error creating overview:", error); 
    res.status(500).json({ message: error.message });
  }
};


// Update an existing overview item
export const updateOverview = async (req, res) => {
  try {
    const updatedOverview = await Overview.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedOverview) {
      return res.status(404).json({ error: "Overview not found" });
    }
    res.json(updatedOverview);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an overview item
export const deleteOverview = async (req, res) => {
  try {
    const deletedOverview = await Overview.findByIdAndDelete(req.params.id);
    if (!deletedOverview) {
      return res.status(404).json({ error: "Overview not found" });
    }
    res.json({ message: 'Overview item deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
