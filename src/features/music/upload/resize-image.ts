/**
 * Resize an image file to fit within the specified dimensions while maintaining aspect ratio.
 * @param file - The image file to resize
 * @param maxWidth - Maximum width in pixels
 * @param maxHeight - Maximum height in pixels
 * @returns Promise resolving to the resized File
 */
export function resizeImage(
  file: File,
  maxWidth: number,
  maxHeight: number
): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    img.onload = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return reject(new Error("Canvas context not available"));
      }

      let width = img.width;
      let height = img.height;

      // Calculate new dimensions while maintaining aspect ratio
      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      // Set canvas dimensions
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      // Convert canvas to Blob
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const resizedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(resizedFile);
          } else {
            reject(new Error("Image resizing failed"));
          }
        },
        file.type,
        1 // quality = 1 to preserve image quality
      );
    };

    img.onerror = () => {
      reject(new Error("Error loading image"));
    };

    reader.onerror = () => {
      reject(new Error("Error reading file"));
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Create an object URL for a file and return a cleanup function.
 */
export function createObjectUrl(file: File | Blob): {
  url: string;
  revoke: () => void;
} {
  const url = URL.createObjectURL(file);
  return {
    url,
    revoke: () => URL.revokeObjectURL(url),
  };
}