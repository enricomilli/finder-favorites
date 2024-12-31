import { exec } from "node:child_process";

export default function openFinder(path: string) {
  exec(`open ${path}`);
}
