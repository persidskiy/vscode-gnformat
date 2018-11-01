export interface Settings {
  gnPath(): string;
}

import * as vscode from 'vscode';
import * as os from 'os';
import * as path from 'path';

function absolutePath(userDefinedPath: string) {
  return userDefinedPath.includes('~') ?
      path.normalize(userDefinedPath.replace(/^~/, os.homedir() + '/')) :
      userDefinedPath;
}

export function prodSettings(): Settings {
  return {
    gnPath: () =>
        absolutePath(vscode.workspace.getConfiguration().get('gnformat.path')),
  };
}

const Settings = prodSettings();
export default Settings as Settings;
