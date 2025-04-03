export default async function handler(req, res) {
  // First try calling your Colab backend
  try {
    const backendUrl = "https://5d24-35-194-18-219.ngrok-free.app/generate";
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    
    // If Colab backend responds, forward its response
    const data = await response.json();
    return res.status(200).json(data);
    
  } catch (error) {
    // Fallback if Colab fails
    console.error("Colab backend failed, using fallback:", error);
    res.status(200).json({ 
      status: 'API is working (fallback mode)',
      message: 'Hello from NAdX.ai!',
      debug: req.body 
    });
  }
}
