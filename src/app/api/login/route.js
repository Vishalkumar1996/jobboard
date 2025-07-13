import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    await connectMongoDB();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { _id: user._id, userType: user.userType },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    const response = NextResponse.json(
      {
        message: "Login successful",
        _id: user._id,
        email: user.email,
        userType: user.userType,
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: false, 
      maxAge: 60 * 60, 
      path: "/",
    });

    return response; 
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
