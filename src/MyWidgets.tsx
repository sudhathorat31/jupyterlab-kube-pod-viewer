import { ReactWidget } from '@jupyterlab/apputils';
import { HelloComponent, CounterComponent } from './MyReactComponents';
import React from 'react';

export class HelloWidget extends ReactWidget {
  constructor() {
    super();
    this.addClass('my-react-widget');
  }

  render() {
    return <HelloComponent />;
  }
}

export class CounterWidget extends ReactWidget {
  constructor() {
    super();
    this.addClass('jp-react-widget');
  }

  render() {
    return <CounterComponent />;
  }
}
