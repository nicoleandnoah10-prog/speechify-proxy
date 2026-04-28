export default async function handler(req, res) {
  const { text } = req.body;

  const response = await fetch("https://api.speechify.ai/v1/audio", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.SPEECHIFY_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      input: text,
      voice: "default"
    })
  });

  const data = await response.json();
  res.json(data);
}
