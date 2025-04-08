import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

type Pod = {
  name: string;
  status: string;
  age: string;
};

export const PodViewerComponent = () => {
  const [namespace, setNamespace] = useState('default');
  const [namespaces, setNamespaces] = useState<string[]>([]);
  const {
    refetch: refetchNamespaces,
    isLoading: nsLoading,
    error: nsError
  } = useQuery(
    ['namespaces'],
    async () => {
      const res = await fetch(
        'https://kube-pod-viewer.onrender.com/namespaces'
      );
      const data = await res.json();
      setNamespaces(data);
      if (!namespace && data.length > 0) {
        setNamespace(data[0]);
      }
      return data;
    },
    { enabled: false }
  );
  const {
    data: pods = [],
    refetch: refetchPods,
    isLoading: podsLoading,
    error: podsError
  } = useQuery(
    ['pods'],
    async () => {
      const res = await fetch(
        `https://kube-pod-viewer.onrender.com/namespaces/${namespace}/pods`
      );
      const data = await res.json();
      console.log(data);
      return data;
    },
    {
      enabled: false
    }
  );

  useEffect(() => {
    if (namespaces.length === 0) {
      refetchNamespaces();
    }
  }, []);

  useEffect(() => {
    if (namespace) {
      refetchPods();
    }
  }, [namespace]);
  return (
    <div className="container">
      <h1 className="title">Pod Viewer</h1>
      {nsLoading ? (
        <p>Loading namespaces...</p>
      ) : nsError ? (
        <p className="error-message">Error loading namespaces</p>
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
        <p className="error-message">Error loading pods</p>
      ) : pods.length === 0 ? (
        <p className="no-data">No pods available in this namespace.</p>
      ) : (
        <div className="table-wrapper">
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
                    <td>
                      <span
                        className={`status-badge ${
                          pod.status.toLowerCase() === 'running'
                            ? 'status-running'
                            : pod.status.toLowerCase() === 'pending'
                              ? 'status-pending'
                              : 'status-failed'
                        }`}
                      >
                        {pod.status}
                      </span>
                    </td>
                    <td>{pod.age}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
