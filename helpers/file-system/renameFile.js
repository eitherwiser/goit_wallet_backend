const renameFile = async (oldName, newName) => {
  const [extension] = oldName.split('.').reverse();
  const renamed = `${newName}.${extension}`;
  return renamed;
};

module.exports = renameFile;
