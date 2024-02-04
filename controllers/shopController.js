const Shop = require('../models/shop'); 

const addShop = async (req, res) => {
  try {
    const { name, category } = req.body;


    const addedBy = req.user._id; 

    const newShop = new Shop({
      name,
      category,
      addedBy,
    });

    const savedShop = await newShop.save();

    res.status(201).json(savedShop);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  addShop,
};
