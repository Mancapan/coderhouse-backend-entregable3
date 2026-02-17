import express from 'express';
import { initMongoDB } from './config/db-connection.js';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 


app.get('/prueba', (req,res)=>{

res.send("POSTMAN: Servidor conectado.....");    
})

initMongoDB()
.then(()=>{
    console.log("Conectado a MongoDB")
}).catch((error)=>{
console.log(error)

})


app.listen(PORT, ()=>{
console.log("Servidor corriendo en:", PORT);
});


