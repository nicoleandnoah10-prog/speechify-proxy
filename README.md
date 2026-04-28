export default async function handler(req, res) {
  try {
    const { text, voice_id = "en-US-Wavenet-D" } = req.body || {};

    if (!text) {
      return res.status(400).json({ error: "Missing text" });
    }

    const response = await fetch("https://api.speechify.ai/v1/audio/speech", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.SPEECHIFY_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        input: text,
        voice_id,
        audio_format: "mp3",
        model: "simba-english"
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    const audioBuffer = Buffer.from(data.audio_data, "base64");

    res.setHeader("Content-Type", "audio/mpeg");
    res.send(audioBuffer);
  } catch (error) {
    res.status(500).json({ error: error.message || "Speechify failed" });
  }
}
