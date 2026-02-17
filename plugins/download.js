const { cmd } = require("../command");
const { ytmp3, ytmp4, tiktok } = require("sadaslk-dlcore");
const yts = require("yt-search");

/**
 * Search YouTube safely (name or link)
 */
async function getYoutube(query) {
  const res = await yts(query);
  if (!res || !res.videos || res.videos.length === 0) return null;
  return res.videos[0];
}

/* ===================== YTMP3 ===================== */

cmd(
  {
    pattern: "ytmp3",
    alias: ["yta", "song"],
    desc: "Download YouTube MP3 by name or link",
    category: "download",
    filename: __filename,
  },
  async (bot, mek, m, { from, q, reply }) => {
    try {
      if (!q) return reply("🎵 *Send song name or YouTube link*");

      await reply("🔎 *Searching YouTube...*");

      const video = await getYoutube(q);
      if (!video) return reply("❌ *No results found*");

      const author =
        typeof video.author === "string"
          ? video.author
          : video.author?.name || "Unknown";

      const caption =
        `🎵 *${video.title}*\n\n` +
        `👤 Channel: ${author}\n` +
        `⏱ Duration: ${video.timestamp}\n` +
        `👀 Views: ${video.views.toLocaleString()}\n` +
        `🔗 ${video.url}`;

      await bot.sendMessage(
        from,
        {
          image: { url: video.thumbnail || video.image },
          caption,
        },
        { quoted: mek }
      );

      await reply("⬇️ *Downloading MP3...*");

      const data = await ytmp3(video.url);
      const audioUrl = data?.url || data?.dl_link;

      if (!audioUrl) return reply("❌ *Failed to download MP3*");

      await bot.sendMessage(
        from,
        {
          audio: { url: audioUrl },
          mimetype: "audio/mpeg",
        },
        { quoted: mek }
      );
    } catch (e) {
      console.error("YTMP3 ERROR:", e);
      reply("❌ *Error while downloading MP3*");
    }
  }
);

/* ===================== YTMP4 ===================== */

cmd(
  {
    pattern: "ytmp4",
    alias: ["ytv", "video"],
    desc: "Download YouTube MP4 by name or link",
    category: "download",
    filename: __filename,
  },
  async (bot, mek, m, { from, q, reply }) => {
    try {
      if (!q) return reply("🎬 *Send video name or YouTube link*");

      await reply("🔎 *Searching YouTube...*");

      const video = await getYoutube(q);
      if (!video) return reply("❌ *No results found*");

      const author =
        typeof video.author === "string"
          ? video.author
          : video.author?.name || "Unknown";

      const caption =
        `🎬 *${video.title}*\n\n` +
        `👤 Channel: ${author}\n` +
        `⏱ Duration: ${video.timestamp}\n` +
        `👀 Views: ${video.views.toLocaleString()}\n` +
        `📅 Uploaded: ${video.ago}\n` +
        `🔗 ${video.url}`;

      await bot.sendMessage(
        from,
        {
          image: { url: video.thumbnail || video.image },
          caption,
        },
        { quoted: mek }
      );

      await reply("⬇️ *Downloading video...*");

      const data = await ytmp4(video.url, {
        format: "mp4",
        videoQuality: "720",
      });

      const videoUrl = data?.url || data?.dl_link;
      if (!videoUrl) return reply("❌ *Failed to download video*");

      await bot.sendMessage(
        from,
        {
          video: { url: videoUrl },
          mimetype: "video/mp4",
          fileName: data?.filename || "youtube_video.mp4",
          caption: "🎬 YouTube Video",
        },
        { quoted: mek }
      );
    } catch (e) {
      console.error("YTMP4 ERROR:", e);
      reply("❌ *Error while downloading video*");
    }
  }
);

/* ===================== TIKTOK ===================== */

cmd(
  {
    pattern: "tiktok",
    alias: ["tt"],
    desc: "Download TikTok video (no watermark)",
    category: "download",
    filename: __filename,
  },
  async (bot, mek, m, { from, q, reply }) => {
    try {
      if (!q) return reply("📱 *Send TikTok link*");

      await reply("⬇️ *Downloading TikTok video...*");

      const data = await tiktok(q);
      const videoUrl = data?.no_watermark || data?.nowm;

      if (!videoUrl) return reply("❌ *Failed to download TikTok video*");

      const caption =
        `🎵 *${data.title || "TikTok Video"}*\n\n` +
        `👤 Author: ${data.author || "Unknown"}\n` +
        `⏱ Duration: ${data.runtime || "?"}s`;

      await bot.sendMessage(
        from,
        {
          video: { url: videoUrl },
          caption,
        },
        { quoted: mek }
      );
    } catch (e) {
      console.error("TIKTOK ERROR:", e);
      reply("❌ *Error while downloading TikTok video*");
    }
  }
);
