import { Schema, model, Types } from "mongoose";

const blogSchema = new Schema({
  slug: { type: String, unique: true, required: true },
  image: { type: String },
  date: { type: Date, default: Date.now },
  isPublished: { type: Boolean, default: true },
  author: {
    name: String,
    profileImage: String,
    link: String,
  },
  translations: {
    es: {
      title: String,
      description: String,
      content: String,
    },
    en: {
      title: String,
      description: String,
      content: String,
    },
  },
  tagIds: [{ type: Types.ObjectId, ref: "Tag" }],
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  lastUpdated: { type: Date, default: Date.now },
  readingTime: { type: Number }, // minutos estimados
});

export default model("Blog", blogSchema);
