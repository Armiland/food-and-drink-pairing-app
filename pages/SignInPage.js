import React from 'react';
import Layout from '../components/Layout';

const SignInPage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-4">Sign In</h1>
        <input type="email" placeholder="Email" className="px-4 py-2 border border-gray-300 rounded-md mb-4" />
        <input type="password" placeholder="Password" className="px-4 py-2 border border-gray-300 rounded-md mb-4" />
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Sign In
        </button>
      </div>
    </Layout>
  );
};

export default SignInPage;