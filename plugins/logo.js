const { cmd } = require('../command');
const Photo360 = require('abir-photo360-apis');

/* ================= EFFECTS ================= */

const effects = {
    naruto: {
        url: 'https://en.ephoto360.com/naruto-shippuden-logo-style-text-effect-online-808.html',
        desc: 'Naruto Shippuden logo'
    },
    dragonball: {
        url: 'https://en.ephoto360.com/create-dragon-ball-style-text-effects-online-809.html',
        desc: 'Dragon Ball logo'
    },
    onepiece: {
        url: 'https://en.ephoto360.com/create-one-piece-logo-style-text-effect-online-814.html',
        desc: 'One Piece logo'
    },
    comic3d: {
        url: 'https://en.ephoto360.com/create-online-3d-comic-style-text-effects-817.html',
        desc: '3D Comic logo'
    },
    marvel: {
        url: 'https://en.ephoto360.com/create-3d-marvel-logo-style-text-effect-online-811.html',
        desc: 'Marvel logo'
    },
    deadpool: {
        url: 'https://en.ephoto360.com/create-text-effects-in-the-style-of-the-deadpool-logo-818.html',
        desc: 'Deadpool logo'
    },
    neon: {
        url: 'https://en.ephoto360.com/write-text-on-3d-neon-sign-board-online-805.html',
        desc: 'Neon text'
    },
    glitch: {
        url: 'https://en.ephoto360.com/create-a-glitch-text-effect-online-812.html',
        desc: 'Glitch text'
    },
    gold: {
        url: 'https://en.ephoto360.com/create-golden-metal-text-effect-online-804.html',
        desc: 'Golden metal text'
    },
    fire: {
        url: 'https://en.ephoto360.com/create-burning-fire-text-effect-online-802.html',
        desc: 'Fire text'
    }
};

/* ================= GENERATOR ================= */

async function createLogo(url, text) {
    try {
        const gen = new Photo360(url);
        gen.setName(text);

        const res = await gen.execute();
        if (!res || !res.imageUrl) {
            return { ok: false, error: "Image generation failed" };
        }

        return { ok: true, image: res.imageUrl };
    } catch (e) {
        console.error(e);
        return { ok: false, error: e.message };
    }
}

/* ================= EFFECT COMMANDS ================= */

for (const effect in effects) {
    cmd({
        pattern: effect,
        desc: effects[effect].desc,
        category: "logo",
        react: "🎨",
        filename: __filename
    }, async (conn, mek, m, { from, args, reply }) => {

        if (!args.length) {
            return reply(`❌ Usage:\n.${effect} Your Text`);
        }

        const text = args.join(" ");
        await reply("⏳ Creating logo...");

        const result = await createLogo(effects[effect].url, text);
        if (!result.ok) return reply(`❌ Error: ${result.error}`);

        await conn.sendMessage(from, {
            image: { url: result.image },
            caption: `✨ *${effect.toUpperCase()}*\n${text}`
        });
    });
}

/* ================= MAIN LOGO COMMAND ================= */

cmd({
    pattern: "logo",
    desc: "Logo command menu",
    category: "logo",
    react: "📋",
    filename: __filename
}, async (conn, mek, m, { args, reply }) => {

    if (!args[0]) {
        return reply(
            "🎨 *LOGO COMMANDS*\n\n" +
            "• .logo list\n" +
            "• .logo info <effect>\n" +
            "• .logo random <text>\n\n" +
            "📝 Example:\n.neon Hello"
        );
    }

    /* LIST */
    if (args[0] === "list") {
        let txt = "🎨 *AVAILABLE EFFECTS*\n\n";
        for (const e in effects) {
            txt += `• .${e} – ${effects[e].desc}\n`;
        }
        return reply(txt);
    }

    /* INFO */
    if (args[0] === "info") {
        const e = args[1];
        if (!effects[e]) return reply("❌ Effect not found");
        return reply(
            `ℹ️ *${e.toUpperCase()}*\n\n` +
            `📝 ${effects[e].desc}\n` +
            `📌 Usage: .${e} Your Text`
        );
    }

    /* RANDOM */
    if (args[0] === "random") {
        const text = args.slice(1).join(" ");
        if (!text) return reply("❌ Provide text");

        const keys = Object.keys(effects);
        const rnd = keys[Math.floor(Math.random() * keys.length)];

        await reply(`🎲 Random effect: ${rnd}`);

        const result = await createLogo(effects[rnd].url, text);
        if (!result.ok) return reply("❌ Failed");

        return conn.sendMessage(m.chat, {
            image: { url: result.image },
            caption: `🎨 *${rnd.toUpperCase()}*\n${text}`
        });
    }

    return reply("❌ Unknown logo command");
});
