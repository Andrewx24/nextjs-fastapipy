import React from 'react';

const Request = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${apiUrl}/api/data`, { cache: 'no-store' });
  const data = await response.json();

  return (
    <div>
      <h1>Data from FastAPI:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Request;
