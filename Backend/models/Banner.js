const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  description: String,
  timer: Number,
  link: String,
  visible: Boolean,
});

module.exports = mongoose.model("Banner", bannerSchema);
