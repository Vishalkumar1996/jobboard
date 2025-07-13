import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { redirect } from 'next/navigation';

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export default async function CandidateDashboard() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/login');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.userType !== 'candidate') {
      redirect('/unauthorized');
    }
  } catch (err) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-bold mb-8 text-green-700">Candidate Dashboard</h1>
      <p>Welcome, Candidate! This is your dashboard.</p>
    </div>
  );
}
