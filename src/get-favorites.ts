import { Buffer } from "node:buffer";

interface BookmarkObject {
  bytes?: string;
  length?: number;
}

interface BookmarkData {
  $objects: {
    [key: string]: BookmarkObject;
  };
}

function decodeBookmarkData(bookmarkBuffer: Buffer): string | null {
  // The bookmark data starts with 'book' magic number
  if (bookmarkBuffer.toString("ascii", 0, 4) !== "book") {
    throw new Error("Invalid bookmark data");
  }

  // Skip the header (8 bytes) and read the data
  let offset = 8;

  // The path data typically starts after the header
  // Look for standard macOS path patterns
  while (offset < bookmarkBuffer.length) {
    // Look for path segments which usually start with '/'
    if (bookmarkBuffer[offset] === 0x2f) {
      // '/' character
      let pathSegment = "";
      while (bookmarkBuffer[offset] && bookmarkBuffer[offset] !== 0x00) {
        pathSegment += String.fromCharCode(bookmarkBuffer[offset]);
        offset++;
      }
      if (pathSegment.length > 1) {
        return pathSegment;
      }
    }
    offset++;
  }

  return null;
}

function readBookmarks(data: BookmarkData): string[] {
  const bookmarks: string[] = [];

  // Find all bookmark data in the file
  for (const key in data.$objects) {
    const obj = data.$objects[key];
    if (obj && obj.bytes && obj.length) {
      // Convert hex string to buffer
      const buffer = Buffer.from(obj.bytes.split(" ")[0], "hex");
      const path = decodeBookmarkData(buffer);
      if (path) {
        bookmarks.push(path);
      }
    }
  }

  return bookmarks;
}

export { decodeBookmarkData, readBookmarks };
