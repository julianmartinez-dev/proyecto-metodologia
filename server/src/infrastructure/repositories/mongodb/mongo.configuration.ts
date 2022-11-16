import { MongoClient } from 'mongodb';

//Connection URL
const MONGO_URL = 'mongodb://mongo:27017/bookings';

//Create a new MongoClient
export const mongoClient = new MongoClient(MONGO_URL);
