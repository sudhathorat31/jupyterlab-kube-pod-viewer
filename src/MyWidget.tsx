import { ReactWidget } from '@jupyterlab/apputils';
import { MyReactComponent } from './MyReactComponent';
import React from 'react';

export class MyWidget extends ReactWidget {
  constructor() {
    super();
    this.addClass('my-react-widget');
  }

  render() {
    return <MyReactComponent />;
  }
}
