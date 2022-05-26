import { MongoClient } from "mongodb";

const dbName = "friedChicken";
var client;

async function connectMongoData() {
    try {
        const uri = "mongodb://admin:maianh93@maianh-mongo.ddns.net/friedChicken";
        client = new MongoClient(uri);
        await client.connect();
    } catch (error) {
        console.log(error);
    }
}

connectMongoData()

const db = () => {
    return client.db(dbName);
}

export default db;