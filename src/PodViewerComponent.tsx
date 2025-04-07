import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

type Pod = {
  name: string;
  status: string;
  age: string;
};

export const PodViewerComponent = () => {
  const [namespace, setNamespace] = useState('default');
  //const [namespacesList, setNamespacesList] = useState<string[]>([]);
  //const [pods, setPods] = useState<Pod[]>([]);
  //const [error, setError] = useState<string | null>(null);

  const {
    data: namespaces = [],
    isLoading: nsLoading,
    error: nsError
  } = useQuery(['namespaces'], async () => {
    const res = await fetch('https://kube-pod-viewer.onrender.com/namespaces');
    const data = await res.json();
    return data;
  });
  /*useEffect(() => {
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
  }, [namespace]);*/
  const {
    data: pods = [],
    isLoading: podsLoading,
    error: podsError
  } = useQuery(
    ['pods', namespace],
    async () => {
      const res = await fetch(
        `https://kube-pod-viewer.onrender.com/namespaces/${namespace}/pods`
      );
      const data = await res.json();
      return data.pods;
    },
    {
      enabled: !!namespace
    }
  );

  React.useEffect(() => {
    if (namespaces.length > 0 && !namespace) {
      setNamespace(namespaces[0]);
    }
  }, [namespaces]);
  return (
    <div className="container">
      <h1 className="title">Pod Viewer</h1>
      {nsLoading ? (
        <p>Loading namespaces...</p>
      ) : nsError ? (
        <p>Error loading namespaces</p>
      ) : (
        <div className="dropdown-group">
          <label htmlFor="namespace-select">Select Namespace:</label>
          <select
            id="namespace-select"
            value={namespace}
            onChange={(e: any) => setNamespace(e.target.value)}
          >
            {namespaces.map((ns: string) => (
              <option key={ns} value={ns}>
                {ns}
              </option>
            ))}
          </select>
        </div>
      )}

      <h3>Pods in "{namespace}"</h3>
      {podsLoading ? (
        <p>Loading pods...</p>
      ) : podsError ? (
        <p>Error loading pods</p>
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
            {pods &&
              pods.map((pod: Pod) => (
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
