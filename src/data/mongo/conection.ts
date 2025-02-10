import mongoose from "mongoose";


interface options {
  mongoUrl: string;
  dbName: string;
}

export class MongoDataBase {

  private constructor() {}

  static async connect(options: options) {
    const { mongoUrl, dbName } = options;

    try {
      await mongoose.connect(mongoUrl, {
        dbName
      });

      return true;

    } catch (error) {
      console.error('Error connecting to MongoDB');
      throw error;
    }
  }

  static async close() {
    await mongoose.connection.close();
  }
}