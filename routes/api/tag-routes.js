const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    Tag.findAll({
      include: {
        model: Product
      }
    }).then((data) => res.status(200).json(data));
  } catch(err){
      res.status(500).json(err);
    }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    Tag.findOne({
      where: {
        id: req.params.id
      },
      include: {
        model: Product
      }
    }).then((data) => res.status(200).json(data));
  } catch(err){
      res.status(500).json(err);
    }
});

router.post('/', (req, res) => {
  // create a new tag
  try {
    Tag.create({
      tag_name: req.body.tag_name
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

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    Tag.update({
      tag_name: req.body.tag_name
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
  // delete on tag by its `id` value
  try {
    Tag.destroy({
      where: {
        id: req.params.id
      }
    }).then((data) => res.status(200).json(data));
  } catch(err){
      res.status(500).json(err);
    }
});

module.exports = router;