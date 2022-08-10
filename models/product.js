const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  displayName: {
    type: String,
  },
  shortDesc: {
    type: String,
    default: "",
  },
  desc: {
    type: String,
    default: "",
  },
  category: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
  },
  discount: {
    type: Number,
    default: 0,
  },
  deliveryCharge: {
    type: Number,
  },
  OfferPrice: {
    type: Number,
  },
  seller: {
    type: String,
  },

  sellerCount: {
    type: Number,
  },
  reviews: [
    {
      userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      rating: {
        type: Number,
      },
      reviewCommnets: {
        type: String,
      },
    },
  ],
});

exports.Product = mongoose.model("Product", productSchema);
