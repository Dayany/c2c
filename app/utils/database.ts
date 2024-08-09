import { MongoClient, ServerApiVersion } from "mongodb";

let isConnected: boolean = false;

const client = new MongoClient(process.env.MONGODB_URI as string, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const connectToDatabase = async () => {
  if (isConnected) {
    console.log("=> using existing database connection");
    return;
  }
  try {
    console.log("=> using new database connection");
    await client.connect();

    isConnected = true;
  } catch (error) {
    console.log("error connecting to database", error);
  }
};
