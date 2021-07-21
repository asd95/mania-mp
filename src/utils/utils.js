// MEDIA RESIZE
export const transformImage = (imagePath, size) => {
  if (!imagePath) {
    return
  }
  return imagePath.match(/media\/screenshots/)
    ? imagePath.replace(
        `media/screenshots', 'media/resize/${size}/-/screenshots`
      )
    : imagePath.replace("media/games", `media/resize/${size}/-/games`);
};
