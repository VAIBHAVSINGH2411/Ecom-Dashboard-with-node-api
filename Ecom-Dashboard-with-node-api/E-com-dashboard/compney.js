const mongoes = require("mongoose");

const compney = new mongoes.Schema({
    cname: String,
    crating: String,
    clocation: String,

});
module.exports = mongoes.model("compneydetail", compney);
