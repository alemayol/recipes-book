export function base64ToImageFile(base64String, filename) {
  const binaryImage = atob(base64String.split(",")[1]);

  const bufferImage = new ArrayBuffer(binaryImage.length);
  const view = new Uint8Array(bufferImage);

  for (let n = 0; n < binaryImage.length; n++) {
    view[n] = binaryImage.charCodeAt(n);
  }

  const BlobImage = new Blob([view], {
    type: "image/png",
  });

  return new File(
    [BlobImage],
    `${filename}-recipe.${BlobImage.type.split("/")[1]}`,
    { type: BlobImage.type }
  );
}
