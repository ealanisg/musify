module.exports.renameKey = (oldName, newName, obj) => {
  if (obj.hasOwnProperty(oldName)) {
      obj[newName] = obj[oldName];
      delete obj[oldName];
  }
  return obj;
};
