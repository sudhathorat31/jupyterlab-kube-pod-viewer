import React, { useState } from 'react';

export const HelloComponent = () => {
  return (
    <div>
      <h2>Hello from React!</h2>
      <p>This is rendered with a React component inside JupyterLab.</p>
    </div>
  );
};

export const CounterComponent = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <p>You clicked {counter} times!</p>
      <button
        onClick={() => {
          setCounter(counter + 1);
        }}
      >
        Increment
      </button>
    </div>
  );
};
