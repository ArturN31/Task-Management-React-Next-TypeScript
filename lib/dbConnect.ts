//IMPORT MONGOOSE
import mongoose, { Model } from "mongoose";

// CONNECTING TO MONGOOSE (Get Database Url from .env.local)
const MONGODB_URI = process.env.MONGODB_URI;

// connection function
export const connect = async () => {
  const conn = await mongoose
    .connect(MONGODB_URI as string)
    .catch(err => console.log(err))

  // SCHEMA
  const TodoSchema = new mongoose.Schema({
    content: String,
    due: Date,
    tags: Array,
    isCompleted: Boolean,
    isOverdue: Boolean
  })

  // MODEL
  const Todo = mongoose.models.Todo || mongoose.model("Todo", TodoSchema)

  return { conn, Todo }
}