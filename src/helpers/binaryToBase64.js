export function binaryToBase64(binaryData) {
  const base64 = btoa(String.fromCharCode(...new Uint8Array(binaryData)));

  return `data:image/png;base64,${base64}`;
}
