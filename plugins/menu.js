const { cmd, commands } = require("../command");

// ⚠️ Keep this prefix the same as in your main bot file
const PREFIX = "#";

cmd(
  {
    pattern: "menu",
    desc: "Displays all available commands",
    category: "main",
    filename: __filename,
  },
  async (bhanuka, mek, m, { reply }) => {
    try {
      const categories = {};

      // Correctly iterate over commands array
      for (const cmdData of commands) {
        // Skip hidden or invalid commands
        if (!cmdData || cmdData.dontAddCommandList) continue;
        if (!cmdData.pattern) continue;

        const category = (cmdData.category || "other").toLowerCase();

        if (!categories[category]) {
          categories[category] = [];
        }

        categories[category].push({
          pattern: cmdData.pattern,
          desc: cmdData.desc || "No description",
        });
      }

      let menuText = "📋 *BHANUKA-MD COMMAND MENU*\n";

      // Build menu text
      for (const [category, cmds] of Object.entries(categories)) {
        menuText += `\n📂 *${category.toUpperCase()}*\n`;

        for (const c of cmds) {
          menuText += `• ${PREFIX}${c.pattern} — ${c.desc}\n`;
        }
      }

      await reply(menuText.trim());
    } catch (error) {
      console.error("MENU COMMAND ERROR:", error);
      reply("❌ Error generating menu.");
    }
  }
);
