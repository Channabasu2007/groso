// models/Blog.js
import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // you can add this for future user linking
    },
    dishName: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    intro: {
      type: String,
      required: true,
    },
    heroImage: {
      imgUrl: { type: String, required: true },
      photographer: String,
      alt: String,
      webUrl: String,
      photographer_url: String,
    },
    ingredients: [
      {
        name: { type: String, required: true },
        quantity: { type: String, default: "" },
      },
    ],
    content: [
      {
        title: { type: String, required: true },
        paragraph: { type: String, required: true },
      },
    ],
    plating: { type: String, default: "" },
    prosCons: {
      pros: [{ type: String }],
      cons: [{ type: String }],
    },
    funFacts: [{ type: String }],
    mode: { type: String, default: "auto" },
  },
  { timestamps: true } // helpful for createdAt/updatedAt
);

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);
