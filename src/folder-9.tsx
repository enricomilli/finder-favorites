import { closeMainWindow } from "@raycast/api";
import openFinder from "./open-finder";

export default function Command() {
  openFinder("Users/mulletbandit/Music");
  closeMainWindow();
}
