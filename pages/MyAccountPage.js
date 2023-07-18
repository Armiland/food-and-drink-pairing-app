import React from 'react';
import Layout from '../components/Layout';

const MyAccountPage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-4">My Account</h1>
        <ul className="mb-4">
          <li>Flavor search 1</li>
          <li>Flavor search 2</li>
          <li>Flavor search 3</li>
          {/* Add more flavor searches */}
        </ul>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
          See Pairings
        </button>
      </div>
    </Layout>
  );
};

export default MyAccountPage;