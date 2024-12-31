
import { closeMainWindow } from "@raycast/api";
import openFinder from "./open-finder"

export default function Command() {
    openFinder("~/Developer");
    closeMainWindow();
}