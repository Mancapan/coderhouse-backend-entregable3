import { connect } from "mongoose";

export const initMongoDB = async () => {
  try {
    //await connect(process.env.MONGO_URL_LOCAL);
    await connect(process.env.MONGO_URL_ATLAS1);
  } catch (error) {
    throw new Error(error);
  }
}; // fin initMongoDB
