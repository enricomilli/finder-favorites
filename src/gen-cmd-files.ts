import { writeFileSync } from "node:fs";

function genCmdFiles() {
  const favFolderPaths = getFavFolderPaths();

  for (let i = 0; i < favFolderPaths.length; i++) {
    const folderPath = favFolderPaths[i];
    writeFileSync(`./src/folder-${i}.tsx`, genCmdFileContent(folderPath));
  }
}

function genCmdFileContent(path: string): string {
  const fileContent = `
import { closeMainWindow } from "@raycast/api";
import openFinder from "./open-finder"

export default function Command() {
    openFinder("${path}");
    closeMainWindow();
}`;
  return fileContent;
}

function getFavFolderPaths(): string[] {
  const favFolders = ["~/Downloads", "~/Documents", "~/Developer"];

  return favFolders;
}

genCmdFiles();
