export default async function handler(req, res) {
  const username = req.query.username;
  if (!username) {
    res.status(400).json({ error: "Username required" });
    return;
  }

  const apiUrl = `https://tiktokinfo-three.vercel.app/api/?username=${username}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      res.status(response.status).json({ error: "Failed to fetch from TikTok API" });
      return;
    }

    const data = await response.json();

    const filtered = {
      uniqueId: data.user.uniqueId,
      nickname: data.user.nickname,
      avatarLarger: data.user.avatarLarger
    };

    res.status(200).json(filtered);

  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
