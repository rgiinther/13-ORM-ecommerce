const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data

  Tag.findAll({
    include: [Product]
  })
  .then ( (productData) => {
    res.json(productData)
  })
  .catch((error) => {
    res.json(error)
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [Product]
  })
  .then ((tagId) => {
    res.json(tagId)
  })
  .catch((error) => {
    res.json(error)
  })
  });

router.post('/', (req, res) => {
  // create a new tag
  console.log(req.body);
  const newTag = Tag.create(req.body);
  const tagId = Tag.findOne({
    where: {
      tag_name: req.body.tag_name,
    },
  });
  res.status(201).send("added new tag #" + tagId.id);
});

router.put('/:id', (req, res) => {
    // update a tag's name by its `id` value
  const tag = Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  res.status(202).send("Tag updated");
});


router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  const tag = Tag.findByPk(req.params.id);
  const deleted = Tag.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).send(`Deleted ${tag.product_tag}`);
});


module.exports = router;
