const postmark = require('postmark');
require('env2')('./config.env');

if (!process.env.POSTMARK_SERVER) {
  throw new Error('Environment variable POSTMARK_SERVER must be set');
}

const client = new postmark.Client(process.env.POSTMARK_SERVER);

module.exports = (email, name, pdf) => {
  const messages = [
    {
      From: 'visitorapp@powertochange.org.uk',
      TemplateId: 3843402,
      To: email,
      TemplateModel: {
        name,
      },
      Attachments: [
        {
          Name: `${name}-QrCode.pdf`,
          Content: pdf,
          ContentType: 'application/octet-stream',
        },
      ],
    },
    {
      From: 'visitorapp@powertochange.org.uk',
      TemplateId: 3853062,
      To: process.env.CB_EMAIL,
      TemplateModel: {
        email,
        name,
      },
      Attachments: [
        {
          Name: 'qrcode.pdf',
          Content: pdf,
          ContentType: 'application/octet-stream',
        },
      ],
    },
  ];
  client.sendEmailBatch(messages, (error, result) => {
    if (error) {
      console.error('Unable to send via postmark: ', error);
      return;
    }
    console.info('Sent to postmark for delivery', result);
  });
};