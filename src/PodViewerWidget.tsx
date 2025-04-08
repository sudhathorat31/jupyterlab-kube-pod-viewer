import { ReactWidget } from '@jupyterlab/apputils';
import React from 'react';
import { PodViewerComponent } from './PodViewerComponent';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export class PodViewerWidget extends ReactWidget {
  constructor() {
    super();
  }

  render() {
    const queryClient = new QueryClient();
    return (
      <QueryClientProvider client={queryClient}>
        <PodViewerComponent />
      </QueryClientProvider>
    );
  }
}
