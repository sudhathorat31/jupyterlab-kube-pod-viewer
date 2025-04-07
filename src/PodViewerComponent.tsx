import React, { useState, useEffect } from 'react';

type Pod = {
  name: string;
  status: string;
  age: string;
};

export const PodViewerComponent = () => {
  const [namespace, setNamespace] = useState('default');
  const [namespacesList, setNamespacesList] = useState<string[]>([]);
  const [pods, setPods] = useState<Pod[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNamespaces = async () => {
      try {
        const response = await fetch(
          'https://kube-pod-viewer.onrender.com/namespaces'
        );
        if (response.ok) {
          const data = await response.json();
          setNamespacesList(data);
          if (data.length > 0) {
            setNamespace(data[0]);
          }
        } else {
          throw new Error('Failed to fetch namespaces');
        }
      } catch (err) {
        console.error('Namespace fetch error:', err);
      }
    };

    fetchNamespaces();
  }, []);

  useEffect(() => {
    const fetchPods = async () => {
      try {
        const response = await fetch(
          `https://kube-pod-viewer.onrender.com/namespaces/${namespace}/pods`
        );
        if (response.ok) {
          const data = await response.json();
          setPods(data.pods);
        } else {
          throw new Error('Failed to fetch pods');
        }
      } catch (err: unknown) {
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
    <div className="container">
      <h1 className="title">Pod Viewer</h1>
      <div className="dropdown-group">
        <label htmlFor="namespace-select">Select Namespace:</label>
        <select
          id="namespace-select"
          value={namespace}
          onChange={e => setNamespace(e.target.value)}
        >
          {namespacesList.map(ns => (
            <option key={ns} value={ns}>
              {ns}
            </option>
          ))}
        </select>
      </div>

      <h3>Pods in "{namespace}"</h3>
      {error ? (
        <div id="error-message" className="error-message">
          Error:{error}
        </div>
      ) : (
        <table id="pods-table">
          <thead>
            <tr>
              <th>Pod Name</th>
              <th>Status</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {pods.map(pod => (
              <tr key={pod.name}>
                <td>{pod.name}</td>
                <td>{pod.status}</td>
                <td>{pod.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
