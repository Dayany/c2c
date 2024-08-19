import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async (): Promise<void> => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("=> using existing database connection");
    return;
  }
  try {
    console.log("=> using new database connection");
    await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: "test",
    });

    isConnected = true;
  } catch (error) {
    console.log("error connecting to database", error);
  }
};
