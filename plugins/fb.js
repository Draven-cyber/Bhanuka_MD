const { cmd } = require("../command");
const getFbVideoInfo = require("@xaviabot/fb-downloader");

cmd(
  {
    pattern: "fb",
    alias: ["facebook"],
    react: "📥",
    desc: "Download Facebook videos",
    category: "download",
    filename: __filename,
  },
  async (bhanuka, mek, m, { from, q, reply }) => {
    try {
      if (!q) {
        return reply("*❌ Please provide a Facebook video link!*");
      }

      // Improved Facebook URL validation
      const fbRegex =
        /^(https?:\/\/)?(www\.)?(facebook\.com|fb\.watch)\/.+/i;

      if (!fbRegex.test(q)) {
        return reply("*❌ Invalid Facebook URL. Please try again!*");
      }

      await reply("*⬇️ Downloading Facebook video... Please wait*");

      const result = await getFbVideoInfo(q);

      if (!result) {
        return reply("*❌ Failed to fetch video information!*");
      }

      const title = result.title || "Facebook Video";
      const hd = result.hd;
      const sd = result.sd;

      if (!hd && !sd) {
        return reply("*❌ No downloadable video found!*");
      }

      const videoUrl = hd || sd;
      const quality = hd ? "HD" : "SD";

      const caption = `
📘 *Facebook Video Downloader*

🎬 *Title:* ${title}
🎞️ *Quality:* ${quality}

— BHANUKA-MD
`;

      // Thumbnail / info message
      await bhanuka.sendMessage(
        from,
        {
          image: {
            url: "https://github.com/bhanukamd1233-cyber/Bhanuka_MD/blob/main/images/FB.png?raw=true",
          },
          caption,
        },
        { quoted: mek }
      );

      // Send video
      await bhanuka.sendMessage(
        from,
        {
          video: { url: videoUrl },
          caption: `📥 *Downloaded in ${quality} quality*`,
        },
        { quoted: mek }
      );

      return reply("✅ *Download complete!* Thank you for using *BHANUKA-MD*");
    } catch (err) {
      console.error("FB Downloader Error:", err);
      reply(`❌ *Error:* ${err.message || "Something went wrong"}`);
    }
  }
);
