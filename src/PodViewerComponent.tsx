import React, { useState, useEffect } from 'react';

export const PodViewerComponent = () => {
  const [namespace, setNamespace] = useState('default');
  const [pods, setPods] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the pods from the FastAPI backend
    const fetchPods = async () => {
      try {
        const response = await fetch(
          `https://kube-pod-viewer.onrender.com/pods/${namespace}`
        );
        if (response.ok) {
          const data = await response.json();
          setPods(data.pods);
        } else {
          throw new Error('Failed to fetch pods');
        }
      } catch (err: unknown) {
        // Type the error to `Error` to access `err.message`
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };
    fetchPods();
  }, [namespace]);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Pod Viewer</h2>
      <label htmlFor="namespace-select">Select Namespace:</label>
      <select
        id="namespace-select"
        value={namespace}
        onChange={e => setNamespace(e.target.value)}
      >
        <option value="default">default</option>
        <option value="kubeSystem">kubeSystem</option>
      </select>

      <h3>Pods in "{namespace}"</h3>
      {error ? (
        <div style={{ color: 'red' }}>Error: {error}</div>
      ) : (
        <ul>
          {pods.map(pod => (
            <li key={pod}>{pod}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
