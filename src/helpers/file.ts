import * as FileSystem from "expo-file-system";

export const cacheDirectory = (folder = "") => {
  const dit = FileSystem.cacheDirectory;
  return dit ? `${dit}${folder ? `${folder}/` : ""}` : "";
};

export const fileUri = (file: string, folder = "") =>
  `${cacheDirectory(folder)}${file}`;

export const ensureDirExists = async (folder = "") => {
  const dir = cacheDirectory(folder);
  let uri = "";
  const dirInfo = await FileSystem.getInfoAsync(dir);
  uri = dirInfo.uri;

  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(cacheDirectory(folder), {
      intermediates: true,
    });

    const dirInfo = await FileSystem.getInfoAsync(dir);
    uri = dirInfo.uri;
  }

  return uri;
};

export async function writeFile(
  filePath: string,
  content: string,
  encoding?: FileSystem.EncodingType
) {
  await FileSystem.writeAsStringAsync(filePath, content, {
    encoding,
  });
}

export async function moveTo(filePath: string, directoryTo: string) {
  const dirInfo = await FileSystem.getInfoAsync(directoryTo);
  let directoryUri = dirInfo.uri;
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(directoryTo, {
      intermediates: true,
    });

    const dirInfo = await FileSystem.getInfoAsync(directoryTo);
    directoryUri = dirInfo.uri;
  }

  const fileName = filePath.split("/").pop();
  const filePathTo = `${directoryUri}/${fileName}`;
  if (!fileName) throw new Error("FileName invalid.");

  await FileSystem.moveAsync({
    from: filePath,
    to: filePathTo,
  });

  return filePathTo;
}
