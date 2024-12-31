import { closeMainWindow } from "@raycast/api";
import { exec } from "node:child_process";

export default function Command() {
  openFinder("~/Downloads");
  closeMainWindow();
}

function openFinder(location: string) {
  exec(`open ${location}`, (error) => {
    if (error) {
      console.error(`Error: ${error}`);
      return error;
    }
  });
}
