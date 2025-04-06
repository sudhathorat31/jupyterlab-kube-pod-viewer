import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { ILauncher } from '@jupyterlab/launcher';
import { MainAreaWidget } from '@jupyterlab/apputils';
import { reactIcon } from '@jupyterlab/ui-components';
import { PodViewerWidget } from './PodViewerWidget';

/**
 * The command IDs used by the react-widget plugin.
 */
namespace CommandIDs {
  export const kubePodViewer = 'kube-pod-viewer-react-widget';
}

/**
 * Initialization data for the kube-pod-viewer extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'kube-pod-viewer:plugin',
  description:
    'A JupyterLab extension to list current Pods in a given Kubernetes namespace.',
  autoStart: true,
  optional: [ILauncher],
  activate: (app: JupyterFrontEnd, launcher: ILauncher) => {
    const { commands } = app;

    const command = CommandIDs.kubePodViewer;
    commands.addCommand(command, {
      caption: 'View pods in Kubernetes cluster',
      label: 'Kube Pod Viewer',
      icon: args => (args['isPalette'] ? undefined : reactIcon),
      execute: () => {
        const content = new PodViewerWidget();
        const widget = new MainAreaWidget<PodViewerWidget>({ content });
        widget.title.label = 'Kube Pod Viewer';
        widget.title.icon = reactIcon;
        app.shell.add(widget, 'main');
      }
    });

    if (launcher) {
      launcher.add({
        command
      });
    }
  }
};

export default plugin;
