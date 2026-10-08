import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export default async function handler(req, res) {
  const count = req.method === "POST"
    ? await redis.incr("views")
    : Number(await redis.get("views")) || 0;
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({ count });
}