// src/MyComponent.js
// import React from 'react';

// const MyComponent = () => <div>AAAAAAAAAAAAAA</div>;

// export default MyComponent;
import React, { useState, useEffect } from 'react';

function MyComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Hello from mf2: Async Data Component Matej</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading data...</p>}
    </div>
  );
}

export default MyComponent;