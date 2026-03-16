const https = require('https');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { message, title, tags, priority } = req.body || {};
  const data = message || '';

  await new Promise((resolve) => {
    const options = {
      hostname: 'ntfy.sh',
      path: '/' + process.env.NTFY_TOPIC,
      method: 'POST',
      headers: {
        'Title': title || 'lapacxlucjossinet.fr',
        'Priority': priority || 'default',
        'Tags': tags || 'bell',
        'Content-Length': Buffer.byteLength(data)
      }
    };
    const r = https.request(options, resolve);
    r.on('error', resolve);
    r.write(data);
    r.end();
  });

  res.status(200).end();
};
