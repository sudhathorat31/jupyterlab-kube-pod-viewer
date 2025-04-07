import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

type Pod = {
  name: string;
  status: string;
  age: string;
};

export const PodViewerComponent = () => {
  const [namespace, setNamespace] = useState('default');
  const {
    data: namespaces = [],
    isLoading: nsLoading,
    error: nsError
  } = useQuery(['namespaces'], async () => {
    const res = await fetch('https://kube-pod-viewer.onrender.com/namespaces');
    const data = await res.json();
    return data;
  });
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
