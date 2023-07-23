const AWS = require('aws-sdk');

module.exports = (file) => {
  const s3 = new AWS.S3();
  const params = {
    ACL: 'public-read',
    Body: file.data,
    Bucket: 'lacupula',
    Key: file.name,

  };
  s3.putObject(params, (err) => {
    if (err) console.log(err, err.stack); // an error occurred
  });
};
