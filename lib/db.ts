import mongoose from "mongoose";

// MongoDB URI
const MONGO_URI = process.env.MONGODB_URI as string;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Deklarasi tipe untuk mongoose cache
declare global {
  var mongoose: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

export default async function connecttoDB() {
  try {
    if (cached.conn) {
      console.log("[MongoDB] Using cached connection");
      return cached.conn;
    }

    if (!cached.promise) {
      const opts = {
        bufferCommands: false,
      };

      console.log("[MongoDB] Connecting to MongoDB:", MONGO_URI);
      cached.promise = mongoose.connect(MONGO_URI, opts);
    }

    cached.conn = await cached.promise;
    console.log("[MongoDB] Connected successfully");
    return cached.conn;
  } catch (error) {
    console.error("[MongoDB] Connection error:", error);
    throw error;
  }
}
