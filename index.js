const fs = require('fs');

module.exports = function(content) {
  if (this.data.newPath) {
    content = fs.readFileSync(this.data.newPath, 'utf8');
  }
  return content;
};

module.exports.pitch = function(remainingRequest, precedingRequest, data) {
  if (this.resourcePath.includes('node_modules')) {
    return (
      'module.exports = require(' +
      JSON.stringify('-!' + remainingRequest) +
      ');'
    );
  }
  const splitPath = this.resourcePath.split('/');
  const path = splitPath.slice(0, -1).join('/');
  const file = splitPath[splitPath.length - 1];

  const splitFile = file.split('.');
  const fileEnding = splitFile[splitFile.length - 1];
  //skip last element and join the rest back together
  const fileWithoutEnding = splitFile.slice(0, -1).join('.');
  const version = this.query.version;
  const versionFilePath = `${path}/${fileWithoutEnding}.${version}.${fileEnding}`;
  if (fs.existsSync(versionFilePath)) {
    data.newPath = versionFilePath;
  }
};
