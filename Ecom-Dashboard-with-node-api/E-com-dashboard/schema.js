const mongoes = require("mongoose");
const userSchema = new mongoes.Schema({
    name: String,
    email: String,
    password: String,
})
module.exports = mongoes.model("users", userSchema);
