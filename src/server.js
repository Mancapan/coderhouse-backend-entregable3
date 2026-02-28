import express from "express";
import { initMongoDB } from "./config/db-connection.js";
import errorHandler from "./middlewares/error-handler.js";
import cartRouter from "./routes/cart-router.js";
import productRouter from "./routes/product-router.js";

const app = express();
const PORT = 8080;


// Middlewares base
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

//Manejo en caso de una ruta inexistente, mensaje de Rout not found en postman
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Middleware global de errores 
app.use(errorHandler);

// Init mongoDB + levantar servidor
initMongoDB()
  .then(() => {
    console.log("Conectado a MongoDB");

    app.listen(PORT, () => {
      console.log("Servidor corriendo en:", PORT);
    });
  })
  .catch((error) => {
    console.error("Error conectando a MongoDB:", error.message);
    process.exit(1);
  });
