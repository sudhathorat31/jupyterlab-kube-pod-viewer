import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

/**
 * Initialization data for the kube-pod-viewer extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'kube-pod-viewer:plugin',
  description:
    'A JupyterLab extension to list current Pods in a given Kubernetes namespace.',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension kube-pod-viewer is activated!');
  }
};

export default plugin;
