export default async function handler(req, res) {
  const backendUrl = "https://5d24-35-194-18-219.ngrok-free.app/";  // ← Paste Colab URL here
  export default function handler(req, res) {
  res.status(200).json({ message: "API is working" });
} 
  try {
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "API call failed" });
  }
}
