import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "portfolio";

let clientPromise: Promise<MongoClient> | undefined;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export async function getDb() {
  if (!uri) {
    throw new Error("MONGODB_URI is not set. Add it to .env.local — see .env.local.example.");
  }

  if (!clientPromise) {
    if (process.env.NODE_ENV === "development") {
      global._mongoClientPromise ??= new MongoClient(uri).connect();
      clientPromise = global._mongoClientPromise;
    } else {
      clientPromise = new MongoClient(uri).connect();
    }
  }

  const c = await clientPromise;
  return c.db(dbName);
}
