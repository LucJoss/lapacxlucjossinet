module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { message, title, tags, priority } = req.body || {};
  try {
    await fetch(`https://ntfy.sh/${process.env.NTFY_TOPIC}`, {
      method: 'POST',
      body: message || '',
      headers: {
        'Title': title || 'lapacxlucjossinet.fr',
        'Priority': priority || 'default',
        'Tags': tags || 'bell'
      }
    });
  } catch (e) {}
  res.status(200).end();
};
