const mongose = require("mongoose");
const mongoes = require("mongoose");
const categories = new mongose.Schema({
    categoriesName: String
});
module.exports = mongose.model("categories", categories);