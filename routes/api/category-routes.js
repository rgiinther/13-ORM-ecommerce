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

router.post("/", (req, res) => {
  Category.create({
    category_name: req.body.category_name,
  })
    .then((allData) => res.json(allData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.put("/:id", (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((allData) => {
      if (!allData) {
        res
          .status(404)
          .json({ message: "There are no catagories with this ID" });
        return;
      }
      res.json(allData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((allData) => {
      if (!allData) {
        res
          .json(404)
          .json({ message: "There is no category found matching this ID" });
        return;
      }
      res.json(allData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
