const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    await Category.findAll({
      attributes: ["id", "category_name"],
      include :[{
        model: Product,
        attributes:["id", "product_name", "price", "stock", "category_id"]
      }]
    }).then((data) => res.status(200).json(data));
  } catch(err){
      res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    await Category.findOne({
      where: {
        id: req.params.id,
      },
      include: [{
        model: Product,
        attributes: ["id", "product_name", "price", "stock"]
      }]
    }).then((data) => res.status(200).json(data));
  } catch(err){
      res.status(400).json(err);
    }
});

router.post('/', (req, res) => {
  // create a new category
  try{
    const newCategory = req.body;
    if (newCategory){
      Category.create(newCategory)
      .then((data) => res.status(200).json(data));
    }
  } catch(err){
      res.status(400).json(err);
    }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try{
    Category.update({
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    }).then((data) => res.status(200).json(data));
  } catch(err){
      res.status(500).json(err);
    }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    Category.destroy({
      where: {
        id: req.params.id
      }
    }).then((data) => res.status(200).json(data));
  } catch(err){
      res.status(500).json(err); 
    }
});

module.exports = router;
