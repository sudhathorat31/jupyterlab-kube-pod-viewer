import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { MainAreaWidget } from '@jupyterlab/apputils';
import { ILauncher } from '@jupyterlab/launcher';
import { CounterWidget } from './MyWidgets';
import { reactIcon } from '@jupyterlab/ui-components';

/**
 * The command IDs used by the react-widget plugin.
 */
namespace CommandIDs {
  export const counter = 'counter-react-widget';
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
    console.log('JupyterLab extension kube-pod-viewer is activated!');

    const { commands } = app;

    const command = CommandIDs.counter;
    commands.addCommand(command, {
      caption: 'Open a new Counter React Widget',
      label: 'Counter React Widget',
      icon: args => (args['isPalette'] ? undefined : reactIcon),
      execute: () => {
        const counterWidget = new CounterWidget();
        const widget = new MainAreaWidget<CounterWidget>({
          content: counterWidget
        });
        widget.title.label = 'Counter React Widget';
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
