import { MongoClient } from "mongodb";

//Connection URL
const uri = 'mongodb://mongo:27017/bookings';

//Create a new MongoClient
export const mongoClient = new MongoClient(uri)