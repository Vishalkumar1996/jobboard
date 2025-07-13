import React from 'react';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-10">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Unauthorized Access</h1>
      <p className="text-lg text-gray-700">
        You do not have permission to view this page.
      </p>
      <a href="/login" className="mt-6 text-blue-600 hover:underline">
        Go to Login
      </a>
    </div>
  );
};

export default Unauthorized;
