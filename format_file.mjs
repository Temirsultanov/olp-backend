export const formatFile = (string) => {
  let [format, content] = string.split(";base64,");
  format = format.split("/")[1];

  if (format === "x-zip-compressed") format = "zip";
  if (format === "octet-stream") format = "rar";

  const fileName = "attachment." + format;
    
  return [fileName, content];
}