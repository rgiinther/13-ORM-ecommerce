const router = require('express').Router();
const { Category, Product } = require('../../models');


// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [Product]
  })
  .then ( (categoriesData) => {
    res.json(categoriesData)
  })
  .catch((error) => {
    res.json(error)
  })

});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
Category.findOne({
  where: {
    id: req.params.id
  },
  include: [Product]
})
.then ((categoryId) => {
  res.json(categoryId)
})
.catch((error) => {
  res.json(error)
})
});

router.post('/', (req, res) => {
  // create a new category
  console.log(req.body);
  const newCategory = await Category.create(req.body);
  const categoryId = await Category.findOne({
    where: {
      category_name: req.body.category_name,
    },
  });
  res.status(201).send("added new category #" + categoryId.id);
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  const category = await Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  res.status(202).send("category name updated");
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  const category = await Category.findByPk(req.params.id);
  const deleted = await Category.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).send(`Deleted ${category.product_tag}`);
});


module.exports = router;
