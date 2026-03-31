import mongoose from "mongoose";

const TopicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true }, 
  // Niche wali line change ki hai: Ab category required nahi hai
  category: { type: String, default: "" }, 
  breadcrumb: String,
  definition: String,
  whyWeUse: String,
  keyPoints: [String],
  codeExample: String,
}, { timestamps: true });

export default mongoose.models.Topic || mongoose.model("Topic", TopicSchema);