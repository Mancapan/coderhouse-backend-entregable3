import mongoose, { connect } from "mongoose";

export const initMongoDB = async ()=>{

    try {
        //await connect(process.env.MONGO_URL_LOCAL);
        await connect(process.env.MONGO_URL_ATLAS);

    } catch (error) {
       throw new Error(error) 
    }
}; // fin initMongoDB


