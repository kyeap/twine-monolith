const QrCode = require('qrcode');

module.exports = string => new Promise(((resolve, reject) => {
  console.log('Im running');
  QrCode.toDataURL(string, {
    errorCorrectionLevel: 'H',
  }, (err, url) => {
    if (err) {
      return reject(err);
    }
    resolve(url);
  });
}));