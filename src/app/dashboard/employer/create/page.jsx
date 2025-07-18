import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { redirect } from 'next/navigation';
import CreateJobForm from '../../../../../components/CreateJobForm';

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export default async function EmployerCreateJobPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/login');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.userType !== 'employer') {
      redirect('/unauthorized');
    }
  } catch (err) {
    redirect('/login');
  }

  return <CreateJobForm />;
}
