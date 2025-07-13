import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Job from "../../../../models/job";

export async function GET() {
    console.log("Test ")
  try {
    await connectMongoDB();

    const jobs = await Job.find({}).sort({ createdAt: -1 }).populate('company', 'name');

    return NextResponse.json({ jobs });
  } catch (err) {
    return NextResponse.json({ message: "Failed to fetch jobs" }, { status: 500 });
  }
}

