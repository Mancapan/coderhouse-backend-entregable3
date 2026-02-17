import express from "express";
import { initMongoDB } from "./config/db-connection.js";
import productRouter from "./routes/product-router.js";




const app = express();
const PORT = 8080;


// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// api/rutas
app.use('/api/products', productRouter)





app.get("/prueba", (req, res) => {
  res.send("POSTMAN: Servidor conectado.....");
});

initMongoDB()
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(PORT, () => {
  console.log("Servidor corriendo en:", PORT);
});
