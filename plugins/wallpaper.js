const { cmd } = require("../command");
const axios = require("axios");

cmd(
  {
    pattern: "wall",
    alias: ["wallpaper"],
    react: "🖼️",
    desc: "Download HD wallpapers",
    category: "download",
    filename: __filename,
  },
  async (bhanuka, mek, m, { from, q, reply }) => {
    try {
      if (!q) {
        return reply("*🖼️ Please enter a keyword to search HD wallpapers!*");
      }

      await reply("*🔍 Searching for HD wallpapers... Please wait.*");

      const response = await axios.get(
        "https://wallhaven.cc/api/v1/search",
        {
          params: {
            q: q,
            sorting: "random",
            resolutions: "1920x1080,2560x1440,3840x2160"
          },
          timeout: 15000
        }
      );

      if (
        !response.data ||
        !Array.isArray(response.data.data) ||
        response.data.data.length === 0
      ) {
        return reply("*❌ No HD wallpapers found for that keyword.*");
      }

      const wallpapers = response.data.data.slice(0, 5);

      await bhanuka.sendMessage(
        from,
        {
          image: {
            url: "https://github.com/bhanukamd1233-cyber/Bhanuka_MD/blob/main/images/BHANUKA%20MD%20LOGO.png?raw=true",
          },
          caption: "🖼️ *BHANUKA-MD WALLPAPER RESULTS*",
        },
        { quoted: mek }
      );

      for (const wp of wallpapers) {
        const caption =
`📥 *Resolution:* ${wp.resolution}
🔗 *Source:* ${wp.url}`;

        await bhanuka.sendMessage(
          from,
          {
            image: { url: wp.path },
            caption,
          },
          { quoted: mek }
        );
      }

      await reply("*🌟 Enjoy your HD wallpapers!*\n— *BHANUKA-MD*");
    } catch (error) {
      console.error("WALL COMMAND ERROR:", error);
      reply("*❌ Failed to fetch wallpapers. Please try again later.*");
    }
  }
);
