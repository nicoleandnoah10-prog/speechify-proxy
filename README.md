export default async function handler(req, res) {
  try {
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

    // 👇 THIS IS THE IMPORTANT PART
    const audioBuffer = await response.arrayBuffer();

    res.setHeader("Content-Type", "audio/mpeg");
    res.send(Buffer.from(audioBuffer));

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Speechify failed" });
  }
}
