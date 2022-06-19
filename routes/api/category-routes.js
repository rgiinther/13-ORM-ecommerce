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
Category.create({
  title: req.body.title,

})

});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
 Category.update(
    {
      title: req.body.title
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value


});

module.exports = router;
