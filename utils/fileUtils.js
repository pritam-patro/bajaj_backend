const validateFile = (fileBase64) => {
    if (!fileBase64) return { isValid: false };
  
    try {
      const buffer = Buffer.from(fileBase64, 'base64');
      const sizeKb = buffer.length / 1024;
      const mimeType = 'application/octet-stream'; // Placeholder MIME type
  
      return {
        isValid: true,
        mimeType,
        sizeKb,
      };
    } catch (error) {
      return { isValid: false };
    }
  };
  
  module.exports = { validateFile };