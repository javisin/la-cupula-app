export function extractFileExtension(filename: string) {
  const dotIndex = filename.lastIndexOf('.');
  if (dotIndex === -1) {
    return null;
  }

  return filename.slice(dotIndex);
}
