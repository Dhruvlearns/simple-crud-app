const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Product = require('./models/product.model.js'); // Use uppercase 'Product' for the model
const productRoute=require("./routes/product.route.js");

// Middleware
app.use(express.json());

// Connect to MongoDB using async/await
(async () => {
    try {
        await mongoose.connect("mongodb+srv://agrawaldhruv932:%40School03@backenddb.s6gtmqw.mongodb.net/Node-API?retryWrites=true&w=majority&appName=backendDB");
        console.log("Connected to the database");
    } catch (error) {
        console.error("Connection failed:", error);
    }
})();
//routes
app.use("/api/products", productRoute);


app.get('/', (req, res) => {
    res.send("Hello from the Node API server with nodemon!");
});


// app.get('/api/productss', async (req, res) => {
//     try {
//         const products = await Product.find({});
//         res.status(200).json(products);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// app.get('/api/products/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const product = await Product.findById(id);
//         res.status(200).json(product);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// app.post('/api/products', async (req, res) => {
//     try {
//         const newProduct = await Product.create(req.body);
//         res.status(201).json(newProduct);
//     } catch (error) {
//         console.error("Product creation failed:", error);
//         res.status(500).json({ message: "Product creation failed" });
//     }
// });

app.put('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body);

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
app.delete('/api/products/:id' ,async (req,res)=>{
    try {
        const {id}=req.params;

      const product=  await Product.findByIdAndDelete(id);
    
        if(!product){
            return res.status(404).json({message:"product not found"});
        }
    
        res.status(200).json({message:"product deleted successfully"});
    
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running successfully on port ${PORT}`);
});
