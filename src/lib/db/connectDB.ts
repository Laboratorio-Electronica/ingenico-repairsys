import mongoose from "mongoose";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error(
    "Please define the DATABASE_URL environment variable inside .env.local"
  );
}

/**
 * Cache global de conexión a Mongoose.
 * Evita múltiples conexiones en hot-reload y serverless.
 */
type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Cache en scope global (Next.js / Node)
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Conecta a MongoDB usando Mongoose con cacheo de conexión.
 * Reutiliza la conexión existente si ya está creada.
 */
async function connectDB() {
  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    cached!.promise = mongoose
      .connect(DATABASE_URL as string, {
        bufferCommands: false,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
      })
      .then((m) => m)
      .catch((err) => {
        cached!.promise = null;
        throw err;
      });
  }

  cached!.conn = await cached!.promise;
  return cached!.conn;
}

export default connectDB;
