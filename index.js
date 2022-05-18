const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4omgr.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const taskCollections = client.db('toDoApp').collection('tasks')
        console.log("mongodb connected");

        // get api for laod the data
        app.get('/task', async (req, res) => {
            const tasks = await taskCollections.find().toArray();
            res.send(tasks);
        });

        // post api for add task
        app.post('/task', async (req, res) => {
            const data = req.body;
            const task = await taskCollections.insertOne(data)
            res.send(task);
        });

    }
    finally {

    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello to do app')
})

app.listen(port, () => {
    console.log(`To do app listening ${port}`)
})