import express from "express";
import { initMongoDB } from "./config/db-connection.js";
import errorHandler from "./middlewares/error-handler.js";
import productRouter from "./routes/product-router.js";

const app = express();
const PORT = 8080;

// --------------------
// Middlewares base
// --------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --------------------
// Rutas
// --------------------
app.get("/prueba", (req, res) => {
  res.send("POSTMAN: Servidor conectado.....");
});

app.use("/api/products", productRouter);

//Manejo ruta inexistente
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// --------------------
// Middleware global de errores (SIEMPRE al final)
// --------------------
app.use(errorHandler);

// --------------------
// Init DB + levantar servidor
// --------------------
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
