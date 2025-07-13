import { NextResponse } from "next/server";
import { verifyToken } from "../../../../../lib/verifyToken";
import { connectMongoDB } from "../../../../../lib/mongodb";
import Job from "../../../../../models/job";
import Company from "../../../../../models/company";

export async function GET(req) {
  try {
    const user = verifyToken(req);

    if (user.userType !== "employer") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    await connectMongoDB();

    const jobs = await Job.find({ employerId: user._id }).sort({ createdAt: -1 }).populate('company', 'name');

    return NextResponse.json({ jobs });
  } catch (err) {
    return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
  }
}

export async function POST(req) {
  try {
    const user = verifyToken(req);

    if (user.userType !== "employer") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const data = await req.json();

    await connectMongoDB();

    // Find or create company by name
    let company = await Company.findOne({ name: data.company, employerId: user._id });
    if (!company) {
      company = new Company({ name: data.company, employerId: user._id });
      await company.save();
    }

    const newJob = new Job({ 
      ...data, 
      company: company._id, 
      employerId: user._id 
    });
    await newJob.save();

    return NextResponse.json({ message: "Job posted successfully" }, { status: 201 });
  } catch (err) {
    console.error("POST /employer/jobs error:", err);
    return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
  }
}

export async function DELETE(req) {
  try {
    const user = verifyToken(req);

    if (user.userType !== "employer") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get("id");

    if (!jobId) {
      return NextResponse.json({ message: "Job ID is required" }, { status: 400 });
    }

    await connectMongoDB();

    const job = await Job.findOne({ _id: jobId, employerId: user._id });

    if (!job) {
      return NextResponse.json({ message: "Job not found or unauthorized" }, { status: 404 });
    }

    await Job.deleteOne({ _id: jobId });

    return NextResponse.json({ message: "Job deleted successfully" });
  } catch (err) {
    console.error("DELETE /employer/jobs error:", err);
    return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
  }
}
