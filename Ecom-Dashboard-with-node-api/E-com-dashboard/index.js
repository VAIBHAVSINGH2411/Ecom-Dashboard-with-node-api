const express = require("express");
const cors = require("cors")
const app = express();
require("./db/config");
const users = require("./schema");
const Product = require("./schemaAddproduct");
const Compney = require("./compney");
const Categories = require("./categories");
app.use(express.json());
app.use(cors());
app.post("/register", async (req, resp) => {
    let user = new users(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    resp.send(result);
})
app.post("/login", async (req, resp) => {
    if (req.body.password && req.body.email) {
        let user = await users.findOne(req.body).select("-password");
        console.log(req.body);
        if (user) {
            resp.send(user);
        }
        else {
            resp.send({ result: "No user" })
        }
    } else {
        resp.send({ result: "No user Found" })
    }
})

app.post("/add-product", async (req, resp) => {
    let produc = new Product(req.body);
    let result = await produc.save();
    resp.json(result)
})

app.get("/find", async (req, resp) => {
    let product = await Product.find();
    if (product.length > 0) {
        resp.send(product)
    }
    else {
        resp.send({ user: "Empty" })
    }
})

app.delete("/delete/:id", async (req, resp) => {
    let result = await Product.deleteOne({ _id: req.params.id });
    resp.send(result);
})

app.get("/findprodcut/:id", async (req, resp) => {
    let result = await Product.findOne({ _id: req.params.id })
    console.log(result);
    if (result) {
        resp.send(result);
    }
    else {
        resp.send({ result: " NO record Found " })
    }
})

app.put("/update/:id", async (req, resp) => {
    let result = await Product.updateOne({ _id: req.params.id }, { $set: req.body })
    resp.send(result);
    console.log(result);
})

app.get("/updateproflie/:id", async (req, resp) => {
    let result = await users.findOne({ _id: req.params.id })
    if (result) {
        resp.send(result)
    }
    else {
        resp.send({ result: "no user found" })
    }
})

app.put("/updateuserprofile/:id", async (req, resp) => {
    let result = await users.updateOne({ _id: req.params.id }, { $set: req.body })
    resp.send(result);
})

app.get("/searchitem/:item", async (req, resp) => {
    let result = await Product.find({
        "$or": [
            { pname: { $regex: req.params.item } },
            { pprice: { $regex: req.params.item } },
            { pcategory: { $regex: req.params.item } },
            { pcompney: { $regex: req.params.item } },
        ]
    })
    resp.send(result);
})

app.post("/addcompney", async (req, resp) => {
    let compney = new Compney(req.body);
    let result = await compney.save();
    resp.json(result)
})

app.delete("/deletecompney/:id", async (req, resp) => {
    let result = await Compney.deleteOne({ _id: req.params.id });
    resp.send(result);

})

app.get("/findcompney", async (req, resp) => {
    let result = await Compney.find();
    resp.send(result);

})

app.post("/addcategories", async (req, resp) => {
    let compney = new Categories(req.body);
    let result = await compney.save();
    resp.json(result)
})

app.delete("/deletecat/:id", async (req, resp) => {
    let result = await Categories.deleteOne({ _id: req.params.id });
    resp.send(result);
})

app.get("/findcat", async (req, resp) => {
    let result = await Categories.find();
    resp.send(result);

})

app.listen(5800);