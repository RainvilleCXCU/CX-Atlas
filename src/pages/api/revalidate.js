import { purgePaths } from '@wpengine/edge-cache';

export default async function handler(req, res) {
  // Check for a secret token to authenticate the request
  if (req.query.secret !== process.env.REVALIDATE_SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const path = req.query.path;

  // Ensure the path parameter is provided
  if (!path) {
    return res.status(400).json({ message: 'Path query parameter is required' });
  }

  try {
    // Revalidate the specified path
    console.log('Revalidate');
    console.log(path);
    await res.revalidate(path);
    await purgePaths([path]);
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).json({ message: 'Error revalidating', error: err.message });
  }
}