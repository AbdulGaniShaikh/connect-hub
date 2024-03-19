import Compressor from 'compressorjs';

const imageCompressor = (image, quality) => {
  return new Promise((resolve, reject) => {
    new Compressor(image, {
      quality: quality,
      maxWidth: 800, // Adjust the maximum width of the compressed image
      maxHeight: 800, // Adjust the maximum height of the compressed image
      mimeType: 'image/jpeg', // output image format
      success(result) {
        resolve(result);
      },
      error(error) {
        reject(error);
      }
    });
  });
};

export default imageCompressor;
