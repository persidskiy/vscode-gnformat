import * as childProcess from 'child_process';
import * as vscode from 'vscode';

import Settings from './Settings';

const wholeDocumentRange =
    new vscode.Range(0, 0, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);

export class GnFormatEditProvider implements
    vscode.DocumentFormattingEditProvider {
  provideDocumentFormattingEdits(
      document: vscode.TextDocument, formatting: vscode.FormattingOptions) {
    const input = document.getText();
    var newContents = null;
    try {
      newContents = childProcess
                        .execFileSync(
                            Settings.gnPath(), ['format', '--stdin'],
                            {encoding: 'utf8', input})
                        .slice(0, -1);
    } catch (error) {
      vscode.window.showErrorMessage(error.message)
      return [];
    }
    return newContents !== input ?
        [vscode.TextEdit.replace(
            document.validateRange(wholeDocumentRange), newContents)] :
        [];
  }
}
