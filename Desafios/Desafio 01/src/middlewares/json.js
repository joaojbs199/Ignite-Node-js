export async function json(req, res) {
  res.setHeader('Content-type', 'application/json')
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch {
    req.body = null
  }
}