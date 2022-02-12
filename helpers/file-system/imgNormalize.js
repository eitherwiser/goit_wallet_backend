const Jimp = require('jimp');

const imgNormalize = async (filePath, imgType) => {
  const { quality, height, width, autocrop } = Schema(imgType);
  try {
    const img = await Jimp.read(filePath);
    await img
      .normalize()
      .autocrop(autocrop)
      .resize(width, height)
      .quality(quality)
      .writeAsync(filePath);
  } catch (error) {
    throw new Error(error.message);
  }
};

const Schema = imgType => {
  switch (imgType) {
    case 'avatar':
      return {
        quality: 60,
        height: 250,
        width: 250,
      };
    default:
      return {
        quality: 75,
        height: 640,
        width: 640,
      };
  }
};

module.exports = imgNormalize;
