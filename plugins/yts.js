const { cmd } = require("../command");
const yts = require("yt-search");

cmd(
  {
    pattern: "yts",
    alias: ["ytsearch", "youtubesearch"],
    react: "🔎",
    desc: "Search YouTube videos",
    category: "search",
    filename: __filename,
  },
  async (bhanuka, mek, m, { from, q, reply }) => {
    try {
      if (!q) {
        return reply("*Please provide a search query!* 🔍");
      }

      await reply("*Searching YouTube for you...* ⌛");

      const search = await yts(q);

      if (!search || !search.videos || search.videos.length === 0) {
        return reply("*No results found on YouTube.* ☹️");
      }

      const results = search.videos.slice(0, 10);

      const formattedResults = results
        .map(
          (v, i) =>
            `🎬 *${i + 1}. ${v.title}*\n📅 ${v.ago} | ⌛ ${v.timestamp} | 👁️ ${v.views.toLocaleString()} views\n🔗 ${v.url}`
        )
        .join("\n\n");

      const caption =
`📺 *YouTube Search Results*
────────────────────────
🔎 *Query:* ${q}

${formattedResults}`;

      await bhanuka.sendMessage(
        from,
        {
          image: {
            url: "https://github.com/bhanukamd1233-cyber/Bhanuka_MD/blob/main/images/Youtube%20search.png?raw=true",
          },
          caption,
        },
        { quoted: mek }
      );
    } catch (error) {
      console.error("YTS COMMAND ERROR:", error);
      reply("*An error occurred while searching YouTube.* ❌");
    }
  }
);
