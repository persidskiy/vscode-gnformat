export interface Settings {
  gnPath(): string;
}

import * as vscode from 'vscode';
import * as os from 'os';
import * as path from 'path';

function substitute_workplace_folder(setting: string): string {
  let workplace_folder: string = "";

  for (const possible_path of [vscode.workspace.rootPath, vscode.window.activeTextEditor]) {
    if (possible_path !== undefined) {
      workplace_folder = possible_path;
      break;
    }
  }

  for (const workspace_varible of ['workspaceRoot', 'workspaceFolder']) {
    setting = setting.replace('${' + workspace_varible + '}', workplace_folder);
  }
  return setting;
}

function absolutePath(userDefinedPath: string) {

  if (userDefinedPath.includes('~'))
    return path.normalize(userDefinedPath.replace(/^~/, os.homedir() + '/'));
  return path.normalize(substitute_workplace_folder(userDefinedPath))
}

export function prodSettings(): Settings {
  return {
    gnPath: () =>
        absolutePath(vscode.workspace.getConfiguration('gnformat').get('path')),
  };
}

const Settings = prodSettings();
export default Settings as Settings;
