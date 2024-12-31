import { parse } from "@plist/parse";
import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { resolve } from "node:path";

export default function getFavFolderPaths(): string[] {
  const favFolders: string[] = [];

  const fileLocation = resolve(
    homedir(),
    "./Library/Application Support/com.apple.sharedfilelist/com.apple.LSSharedFileList.FavoriteItems.sfl3",
  );

  const fileBuffer = readFileSync(fileLocation);
  const arrayBuffer = fileBuffer.buffer.slice(fileBuffer.byteOffset, fileBuffer.byteOffset + fileBuffer.byteLength);

  const parsedFile = parse(arrayBuffer);
  if (!parsedFile) throw new Error("parsed file is null");

  // @ts-expect-error $object is a string
  const objects = parsedFile["$objects"];

  objects.forEach((obj: string[] | string) => {
    if (obj instanceof ArrayBuffer) {
      const uint8Array = new Uint8Array(obj);
      const decoder = new TextDecoder("utf-8");

      try {
        const text = decoder.decode(uint8Array);
        const readableStrings = text.match(/[\x20-\x7E]{4,}/g);
        if (readableStrings) {
          // Filter out the UUID and other noise
          const filteredStrings = readableStrings.filter(
            (str) =>
              !str.match(
                /^(book|sfla|unix|AppKit|NSObject|file:\/\/|Macintosh HD|0512D2A2-95A1-4C49-A27D-EA5C7628CB7C)/,
              ),
          );

          if (filteredStrings.length > 0) {
            const path = filteredStrings.join("/");
            // console.log(`\nBookmark ${index} path:`, `/${filteredStrings.join("/")}`);
            favFolders.push(path);
          }
        }
      } catch (e) {
        // Ignore decode errors
      }
    }
  });

  return favFolders;
}

/*
const possibleFileLocations = [
  "~/Library/Preferences/com.apple.systemuiserver.plist",
  `~/Library/Preferences/com.apple.sidebarlists.plist`,
  `~/Library/Application Support/com.apple.sharedfilelist/com.apple.LSSharedFileList.FavoriteItems.sfl2`,
  `~/Library/Application Support/com.apple.sharedfilelist/com.apple.LSSharedFileList.FavoriteItems.sfl3`,
];
*/
