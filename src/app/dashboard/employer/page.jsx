import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { redirect } from 'next/navigation';
import EmployerJobList from '../../../../components/joblist/EmployerJobList';
import EmployerHeader from '../../../../components/EmployerHeader';

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export default async function EmployerDashboard() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/login');
  }

  let decoded;
  try {
    console.log("Verifying token:", token);
    decoded = jwt.verify(token, JWT_SECRET);
    console.log("Decoded token:", decoded);
    if (decoded.userType !== 'employer') {
      console.log("User type is not employer:", decoded.userType);
      redirect('/unauthorized');
    }
  } catch (err) {
    console.error("Token verification error:", err);
    redirect('/login');
  }

  const cookieHeader = cookieStore.toString();
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/employer/jobs`, {
    cache: 'no-store',
    headers: {
      cookie: cookieHeader,
    },
    next: { revalidate: 0 },
  });

  console.log("Jobs API response status:", res.status);
  const data = await res.json();
  console.log("Jobs API response data:", data);

  if (!res.ok) {
    redirect('/login');
  }

  const jobs = data.jobs || [];

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <EmployerHeader />
      <EmployerJobList jobs={jobs} />
    </div>
  );
}
