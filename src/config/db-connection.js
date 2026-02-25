import { connect } from "mongoose";

export const initMongoDB = async () => {
  try {
    await connect(process.env.MONGO_URL_ATLAS1);
    //await connect(process.env.MONGO_URL_ATLAS_REVISION); // armar archivo .env y seguir indicaciones de  archivo= ../.env.example

  } catch (error) {
    throw new Error(error);
  }
}; // fin initMongoDB
