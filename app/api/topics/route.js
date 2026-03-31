import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb";
import Topic from "../../../models/Topic";

// NAYA TOPIC ADD KARNE KE LIYE
export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    const slug = data.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    const newTopic = new Topic({ ...data, slug });
    await newTopic.save();
    return NextResponse.json({ success: true, message: "Topic Saved!" });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// SAARE TOPICS DEKHNE KE LIYE (Manage Table ke liye)
export async function GET() {
  try {
    await connectDB();
    const topics = await Topic.find({}).sort({ createdAt: -1 }); // Latest pehle
    return NextResponse.json({ success: true, data: topics });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}