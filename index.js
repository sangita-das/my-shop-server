const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config();
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hyeto.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// console.log(uri);

async function run() {
  try {
    await client.connect();
    console.log('database connected successfully');

    const database = client.db('myshop');

    const reviewsCollection = database.collection('review');
    const productsCollection = database.collection('products');


 // all reviews get

 app.get('/reviews', async (req, res) => {
  const cursor = reviewsCollection.find({});
  const reviews = await cursor.toArray();
  res.send(reviews);
});


// reviews post
app.post('/reviews', async (req, res) => {
  const review = req.body;
  console.log('Hit the api', review);

  const result = await reviewsCollection.insertOne(review);
  console.log(result);
  res.json(result);
});

 




  // All order product display 'GET'
  app.get('/products', async (req, res) => {
    const cursor = productsCollection.find({});
    const products = await cursor.toArray();
    res.send(products);
  });


 



  // products post
  app.post('/products', async (req, res) => {
    const product = req.body;
    console.log(product);
    const result = await productsCollection.insertOne(product);
    console.log(result);
    // res.json({ message: 'hello' })
    res.json(result)
  });



    
  }


  
  finally {
    // await client.close();
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello from my shop!')
})

app.listen(port, () => {
  console.log(`listening at ${port}`)
})