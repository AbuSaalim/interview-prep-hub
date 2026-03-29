import mongoose from "mongoose";

const TopicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true }, // use-state, use-effect
  category: { type: String, required: true }, // React Hooks, Core Concepts
  breadcrumb: String,
  definition: String,
  whyWeUse: String,
  keyPoints: [String], // Checkbox points ka array
  codeExample: String,
}, { timestamps: true });

export default mongoose.models.Topic || mongoose.model("Topic", TopicSchema);