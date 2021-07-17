const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewsSchema = new Schema(
  {
    username: {type:String,unique:true},
    password: String,
    campus:{type:String,enum:[`Madrid`, `Barcelona`, `Miami`, `Paris`, `Berlin`, `Amsterdam`, `México`, `Sao Paulo`, `Lisbon`],default:'Lisbon'},
    course:{type:String, enum:[`Web Dev`, `UX/UI`, `Data Analytics`],default:'Web Dev'},
    image:String
  },
  {
    timestamps: true,

  }
);

const ReviewsModel = mongoose.model("Reviews", reviewsSchema);
module.exports = ReviewsModel;
