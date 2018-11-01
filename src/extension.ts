"use strict";

import * as vscode from "vscode";
import { GnFormatEditProvider } from "./GnFormatEditProvider";

export function activate(context: vscode.ExtensionContext) {
  const swiftSelector: vscode.DocumentSelector = {
    scheme: "file",
    language: "gn"
  };
  const editProvider = new GnFormatEditProvider();
  vscode.languages.registerDocumentFormattingEditProvider(
    swiftSelector,
    editProvider
  );
}
