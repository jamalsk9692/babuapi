export default async function handler(req, res) {
  try {
    const { dlno, dob } = req.query;

    if (!dlno || !dob) {
      return res.status(400).json({ error: "Missing required parameters." });
    }

    // Format parameters
    const formattedDlno = dlno.replace(/\s+/g, "").toUpperCase();
    const formattedDob = dob.replace(/\//g, "-");

    // API URL
    const apiUrl = `https://sandbox.sandhyapanindia.com/Lock%20Api/Driving%20Licence/digitalportal.in/Main.php?dl_no=${formattedDlno}&dob=${formattedDob}`;

    // Headers
    const headers = {
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "sec-ch-ua": '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
      "sec-ch-ua-mobile": "?1",
      "sec-ch-ua-platform": '"Android"',
      "upgrade-insecure-requests": "1",
      "sec-fetch-site": "none",
      "sec-fetch-mode": "navigate",
      "sec-fetch-dest": "document",
      "accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7,hi;q=0.6,mt;q=0.5,bn;q=0.4",
      priority: "u=0, i",
    };

    // Fetch API request
    const response = await fetch(apiUrl, { method: "GET", headers });

    // Get text response
    const data = await response.text();

    // Send response
    res.status(200).send(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}
