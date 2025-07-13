import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { redirect } from 'next/navigation';

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export default async function AdminDashboard() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/login');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded.isAdmin) {
      redirect('/unauthorized');
    }
  } catch (err) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-bold mb-8 text-red-700">Admin Dashboard</h1>
      <p>Welcome, Admin! This is your dashboard.</p>
    </div>
  );
}
