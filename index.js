import express from "express";
import db from './mongo-client/mongo-client.js'
import cors from "cors"

const app = express();
const port = 3001;

app.use(cors())

app.get("/categories", (req, res) => {
    findAllCategories(db()).then(categories => {
        res.send(categories)
    }).catch(err => {
        console.log(err)
        res.status(500).send({
            message: "error cmnr"
        })
    })
})

async function findAllCategories(db) {
    const result = [];
    const cursor = db.collection("category").find({});
    await cursor.forEach(doc => result.push(doc));
    return result;
}

app.get("/categories/:categoryId", (req, res) => {
    findCategoryByCategoryId(db(), req.params.categoryId).then(category => {
        res.send(category);
    }).catch(err => {
        console.log(err)
        res.status(500).send({
            message: "error cmnr"
        })
    })
})

async function findCategoryByCategoryId(db, id) {
    let result = {};
    const cursor = db.collection("category").find({categoryId: Number(id)});
    return (await cursor.toArray()).shift();
}


app.get("/products", (req, res) => {
    if (req.query["categoryId"]) {
        findProductsByCategoryId(db(), req.query.categoryId).then(product => {
            res.send(product);
        }).catch(err => {
            console.log(err)
            res.status(500).send({
                message: "error cmnr"
            })
        })
    } else {
        findAllProducts(db()).then(product => {
            res.send(product);
        }).catch(err => {
            console.log(err)
            res.status(500).send({
                message: "error cmnr"
            })
        })
    }

})

async function findProductsByCategoryId(db, id) {
    let result = [];
    const cursor = db.collection("product").find({categoryId: Number(id)});
    await cursor.forEach(doc => result.push(doc));
    return result;
}

async function findAllProducts(db) {
    let result = [];
    const cursor = db.collection("product").find({});
    await cursor.forEach(doc => result.push(doc));
    return result;
}

app.get("/promotion", (req, res) => {
    findPromotionProduct(db()).then(product => {
        res.send(product);
    }).catch(err => {
        console.log(err)
        res.status(500).send({
            message: "error cmnr"
        })
    })
})

async function findPromotionProduct(db) {
    let result = [];
    const cursor = db.collection("product").find({categoryId: 293});
    await cursor.forEach(doc => result.push(doc));
    return result;
}

app.get("/products/:productId", (req, res) => {
    console.log(req.params)
    findProductByProductId(db(), req.params.productId).then(product => {
        res.send(product);
    }).catch(err => {
        console.log(err)
        res.status(500).send({
            message: "error cmnr"
        })
    })
})

async function findProductByProductId(db, id) {
    let result = [];
    const cursor = db.collection("product").find({productId: Number(id)});
    await cursor.forEach(doc => result.push(doc))
    return result;
}

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

