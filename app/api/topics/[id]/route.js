import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongodb";
import Topic from "../../../../models/Topic";

// TOPIC UPDATE (EDIT) KARNE KE LIYE
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const data = await request.json();
    
    // Slug bhi update kar dete hain agar title change hua ho
    if (data.title) {
      data.slug = data.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    }

    const updatedTopic = await Topic.findByIdAndUpdate(id, data, { new: true });
    return NextResponse.json({ success: true, data: updatedTopic });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// TOPIC DELETE KARNE KE LIYE
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    await Topic.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Topic Deleted!" });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}