import React, { useState, useEffect } from 'react';

const mockPods: { [key: string]: string[] } = {
  default: ['pod-a', 'pod-b'],
  kubeSystem: ['kube-dns', 'metrics-server']
};

export const PodViewerComponent = () => {
  const [namespace, setNamespace] = useState('default');
  const [pods, setPods] = useState<string[]>([]);

  useEffect(() => {
    // Simulate fetch
    setPods(mockPods[namespace] || []);
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
        {Object.keys(mockPods).map(ns => (
          <option key={ns} value={ns}>
            {ns}
          </option>
        ))}
      </select>

      <h3>Pods in "{namespace}"</h3>
      <ul>
        {pods.map(pod => (
          <li key={pod}>{pod}</li>
        ))}
      </ul>
    </div>
  );
};
