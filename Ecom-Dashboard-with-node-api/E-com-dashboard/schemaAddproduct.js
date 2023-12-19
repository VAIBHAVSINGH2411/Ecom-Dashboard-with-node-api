const mongose = require("mongoose");
const mongoes = require("mongoose");
const addProductes = new mongose.Schema({
    pname: String,
    pprice: String,
    pcategory: String,
    userId: String,
    pcompney: String,
    compneyId: String
});
module.exports = mongose.model("addProductes", addProductes);