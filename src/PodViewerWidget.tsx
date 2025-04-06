import { ReactWidget } from '@jupyterlab/apputils';
import React from 'react';
import { PodViewerComponent } from './PodViewerComponent';

export class PodViewerWidget extends ReactWidget {
  constructor() {
    super();
    this.addClass('my-react-widget');
  }

  render() {
    return <PodViewerComponent />;
  }
}
