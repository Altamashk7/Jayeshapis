const { Product } = require("../models/product");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const async = require("async");

//get all product details
router.get(`/`, async (req, res) => {
  const productList = await Product.find();
  if (!productList) {
    res.status(500).json({ success: false });
  }
  res.send(productList);
});

//get product details by name
router.get(`/:productname/details`, async (req, res) => {
  const product = await Product.find({ displayName: req.params.productname });

  if (!product) {
    res.status(500).json({ success: false });
  }
  res.send(product);
});

//post product
router.post(`/add`, async (req, res) => {
  let product = new Product({
    displayName: req.body.displayName,
    shortDesc: req.body.shortDesc,
    description: req.body.description,
    category: req.body.category,
    price: req.body.price,
    discount: req.body.discount,
    deliveryCharge: req.body.deliveryCharge,
  });

  product = await product.save();

  if (!product) return res.status(500).send("The product cannot be created");

  res.send(product);
});

// modify product by name
router.put("/:productname/modify", async (req, res) => {
  let params = {
    price: req.body.price,
    discount: req.body.discount,
    deliveryCharge: req.body.deliveryCharge,
  };
  for (let prop in params) if (!params[prop]) delete params[prop];

  const product = await Product.findOneAndUpdate(
    { displayName: req.params.productname },
    params,
    {
      new: true,
    }
  );

  if (!product) return res.status(500).send("the product cannot be updated!");
  res.send(product);
});

module.exports = router;
