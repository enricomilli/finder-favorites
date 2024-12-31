import { readFileSync, writeFileSync } from "node:fs";
import getFavFolderPaths from "./get-favorite-folders";

interface PackageCmd {
  name: string;
  title: string;
  description: "See your favorite folders from finder";
  mode: "no-view";
}

function genCmdFiles() {
  const favFolderPaths = getFavFolderPaths();

  for (let i = 0; i < favFolderPaths.length; i++) {
    const folderPath = favFolderPaths[i];
    writeFileSync(`./src/folder-${i}.tsx`, genCmdFileContent(folderPath));
  }

  genPackageJsonCommands(favFolderPaths);
}

function genPackageJsonCommands(favFolders: string[]) {
  const packageJSON = JSON.parse(readFileSync("./package.json", "utf8"));
  const commandsList: PackageCmd[] = [];
  for (let i = 0; i < favFolders.length; i++) {
    const folderPath = favFolders[i];

    const pathSplit = folderPath.split("/");
    const commandName = pathSplit[pathSplit.length - 1];

    const newCommand: PackageCmd = {
      name: `folder-${i}`,
      title: commandName,
      description: "See your favorite folders from finder",
      mode: "no-view",
    };

    commandsList.push(newCommand);
  }
  packageJSON["commands"] = commandsList;

  writeFileSync("./package.json", JSON.stringify(packageJSON, null, 2));
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

genCmdFiles();
