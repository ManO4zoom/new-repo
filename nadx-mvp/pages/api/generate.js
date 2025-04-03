export default async function handler(req, res) {
  // For testing - comment this out when Colab is ready
  if (process.env.NODE_ENV === 'development') {
    return res.status(200).json({
      status: 'DEV MODE: API is working',
      debug: req.body
    });
  }

  // Production - call your Colab backend
  try {
    const backendUrl = process.env.COLAB_URL || "https://4c5f-34-125-25-161.ngrok-free.app//generate";
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    return res.status(200).json(await response.json());
  } catch (error) {
    return res.status(500).json({
      error: "Backend connection failed",
      message: error.message
    });
  }
}
