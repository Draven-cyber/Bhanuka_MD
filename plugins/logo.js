const { cmd, commands } = require('../command');
const Photo360 = require('abir-photo360-apis');

const effects = {
    naruto: {
        url: 'https://en.ephoto360.com/naruto-shippuden-logo-style-text-effect-online-808.html',
        desc: 'Naruto Shippuden style text effect'
    },
    dragonball: {
        url: 'https://en.ephoto360.com/create-dragon-ball-style-text-effects-online-809.html',
        desc: 'Dragon Ball style text effect'
    },
    onepiece: {
        url: 'https://en.ephoto360.com/create-one-piece-logo-style-text-effect-online-814.html',
        desc: 'One Piece logo style text effect'
    },
    
    '3dcomic': {
        url: 'https://en.ephoto360.com/create-online-3d-comic-style-text-effects-817.html',
        desc: '3D Comic style text effect'
    },
    marvel: {
        url: 'https://en.ephoto360.com/create-3d-marvel-logo-style-text-effect-online-811.html',
        desc: 'Marvel logo style text effect'
    },
    deadpool: {
        url: 'https://en.ephoto360.com/create-text-effects-in-the-style-of-the-deadpool-logo-818.html',
        desc: 'Deadpool logo style text effect'
    },
    
    blackpink: {
        url: 'https://en.ephoto360.com/create-a-blackpink-style-logo-with-members-signatures-810.html',
        desc: 'Blackpink style logo with signatures'
    },
    harrypotter: {
        url: 'https://en.ephoto360.com/create-harry-potter-logo-style-text-effect-online-815.html',
        desc: 'Harry Potter logo style text effect'
    },
    
    neon: {
        url: 'https://en.ephoto360.com/write-text-on-3d-neon-sign-board-online-805.html',
        desc: '3D Neon sign board text'
    },
    glitch: {
        url: 'https://en.ephoto360.com/create-a-glitch-text-effect-online-812.html',
        desc: 'Glitch text effect'
    },
    rainbow: {
        url: 'https://en.ephoto360.com/create-rainbow-text-effects-online-801.html',
        desc: 'Rainbow text effect'
    },
    glass: {
        url: 'https://en.ephoto360.com/create-glass-text-effect-online-821.html',
        desc: 'Transparent glass text effect'
    },
    frostedGlass: {
        url: 'https://en.ephoto360.com/create-frosted-glass-text-effect-online-822.html',
        desc: 'Frosted glass text effect'
    },
    neonGlass: {
        url: 'https://en.ephoto360.com/create-3d-neon-glass-text-effect-online-823.html',
        desc: '3D neon glass text effect'
    },
    
    gold: {
        url: 'https://en.ephoto360.com/create-golden-metal-text-effect-online-804.html',
        desc: 'Golden metal text effect'
    },
    silver: {
        url: 'https://en.ephoto360.com/create-silver-metal-text-effect-online-806.html',
        desc: 'Silver metal text effect'
    },
    diamond: {
        url: 'https://en.ephoto360.com/create-diamond-text-effect-online-807.html',
        desc: 'Diamond text effect'
    },
    
    fire: {
        url: 'https://en.ephoto360.com/create-burning-fire-text-effect-online-802.html',
        desc: 'Burning fire text effect'
    },
    water: {
        url: 'https://en.ephoto360.com/create-underwater-text-effect-online-803.html',
        desc: 'Underwater text effect'
    },
    smoke: {
        url: 'https://en.ephoto360.com/create-smoky-text-effect-online-799.html',
        desc: 'Smoky text effect'
    },
    ice: {
        url: 'https://en.ephoto360.com/create-ice-text-effect-online-824.html',
        desc: 'Frozen ice text effect'
    },
    crystal: {
        url: 'https://en.ephoto360.com/create-crystal-text-effect-online-825.html',
        desc: 'Shiny crystal text effect'
    },
    
    luxury: {
        url: 'https://en.ephoto360.com/create-luxury-gold-text-effect-online-800.html',
        desc: 'Luxury gold text effect'
    },
    modern: {
        url: 'https://en.ephoto360.com/create-modern-metallic-text-effect-online-819.html',
        desc: 'Modern metallic text effect'
    },
    
    christmas: {
        url: 'https://en.ephoto360.com/create-christmas-text-effect-online-798.html',
        desc: 'Christmas text effect'
    },
    halloween: {
        url: 'https://en.ephoto360.com/create-halloween-pumpkin-text-effect-online-796.html',
        desc: 'Halloween pumpkin text effect'
    },
    
    graffiti: {
        url: 'https://en.ephoto360.com/create-graffiti-text-effects-online-795.html',
        desc: 'Graffiti text effect'
    },
    sand: {
        url: 'https://en.ephoto360.com/write-text-on-the-beach-sand-online-794.html',
        desc: 'Beach sand text effect'
    },
    sky: {
        url: 'https://en.ephoto360.com/write-text-on-the-cloud-sky-online-793.html',
        desc: 'Cloud sky text effect'
    },
    space: {
        url: 'https://en.ephoto360.com/create-galaxy-text-effect-online-792.html',
        desc: 'Galaxy text effect'
    }
};


async function createLogo(effectUrl, text) {
    try {
        const generator = new Photo360(effectUrl);
        generator.setName(text);
        
        const result = await generator.execute();
        
        if (result.status && result.imageUrl) {
            return {
                success: true,
                imageUrl: result.imageUrl,
                sessionId: result.sessionId
            };
        } else {
            return {
                success: false,
                error: 'Failed to generate image'
            };
        }
    } catch (error) {
        console.error('Photo360 Error:', error.message);
        return {
            success: false,
            error: error.message
        };
    }
}

for (const [effectName, effectInfo] of Object.entries(effects)) {
    cmd({
        pattern: effectName,
        desc: effectInfo.desc,
        category: "logo",
        react: "🎨",
        filename: __filename
    }, async (conn, mek, m, { from, args, reply }) => {
        try {
            if (!args.length) {
                return reply(`❌ Please provide text.\nExample: .${effectName} Your Text`);
            }
            
            const text = args.join(" ");
            await reply(`⏳ Creating ${effectName} logo...`);
            
            const result = await createLogo(effectInfo.url, text);
            
            if (!result.success) {
                return reply(`❌ Failed to create logo: ${result.error}`);
            }

            await conn.sendMessage(from, {
                image: { url: result.imageUrl },
                caption: `✨ ${effectName.charAt(0).toUpperCase() + effectName.slice(1)}: ${text}`
            });

        } catch (e) {
            console.error(e);
            return reply(`❌ Error: ${e.message}`);
        }
    });
}

cmd({
    pattern: "logo list",
    desc: "Show all available logo effects",
    category: "logo",
    react: "📋",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        let list = "🎨 *Available Logo Effects:*\n\n";
        
        const categories = {
            '🎌 Anime & Movies': ['naruto', 'dragonball', 'onepiece', 'marvel', 'deadpool', 'harrypotter'],
            '🎵 Music & Entertainment': ['blackpink'],
            '✨ Glow & Effects': ['neon', 'glitch', 'rainbow'],
            '💰 Metal & Luxury': ['gold', 'silver', 'diamond', 'luxury', 'modern'],
            '🌿 Nature & Elements': ['fire', 'water', 'smoke', 'sand', 'sky', 'space'],
            '🎄 Holidays': ['christmas', 'halloween'],
            '🎨 Art & Design': ['3dcomic', 'graffiti']
        };
        
        for (const [category, effectList] of Object.entries(categories)) {
            list += `*${category}:*\n`;
            effectList.forEach(effect => {
                if (effects[effect]) {
                    list += `• .${effect} - ${effects[effect].desc}\n`;
                }
            });
            list += '\n';
        }
        
        list += "\n📝 *Usage:* .[effect] [text]\n";
        list += "📌 *Example:* .naruto Uzumaki";
        
        await reply(list);
        
    } catch (e) {
        return reply(`❌ Error: ${e.message}`);
    }
});

cmd({
    pattern: "logo search",
    desc: "Search for logo effects",
    category: "logo",
    react: "🔍",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    try {
        if (!args.length) {
            return reply("❌ Please provide search term.\nExample: .logo search neon");
        }
        
        const searchTerm = args.join(" ").toLowerCase();
        const results = [];
        
        for (const [effect, info] of Object.entries(effects)) {
            if (effect.includes(searchTerm) || 
                info.desc.toLowerCase().includes(searchTerm) ||
                info.url.toLowerCase().includes(searchTerm)) {
                results.push(`• .${effect} - ${info.desc}`);
            }
        }
        
        if (results.length > 0) {
            await reply(`🔍 *Found ${results.length} effects for "${searchTerm}":*\n\n${results.join('\n')}`);
        } else {
            await reply(`❌ No effects found for "${searchTerm}".\nUse .logo list to see all effects.`);
        }
        
    } catch (e) {
        return reply(`❌ Error: ${e.message}`);
    }
});

cmd({
    pattern: "logo random",
    desc: "Create random logo effect",
    category: "logo",
    react: "🎲",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    try {
        if (!args.length) {
            return reply("❌ Please provide text.\nExample: .logo random My Text");
        }
        
        const text = args.join(" ");
        
        const effectKeys = Object.keys(effects);
        const randomEffect = effectKeys[Math.floor(Math.random() * effectKeys.length)];
        const effectInfo = effects[randomEffect];
        
        await reply(`🎲 Creating random ${randomEffect} logo...`);
        
        const result = await createLogo(effectInfo.url, text);
        
        if (!result.success) {
            return reply(`❌ Failed: ${result.error}`);
        }

        await conn.sendMessage(from, {
            image: { url: result.imageUrl },
            caption: `✨ ${randomEffect.charAt(0).toUpperCase() + randomEffect.slice(1)}: ${text}\n🎲 Random Effect`
        });

    } catch (e) {
        return reply(`❌ Error: ${e.message}`);
    }
});

cmd({
    pattern: "logo batch",
    desc: "Create multiple effects at once",
    category: "logo",
    react: "🔄",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    try {
        if (args.length < 2) {
            return reply("❌ Usage: .logo batch [effect1,effect2,...] [text]\nExample: .logo batch naruto,dragonball,neon Uzumaki");
        }
        
        const effectsList = args[0].split(',').map(e => e.trim().toLowerCase());
        const text = args.slice(1).join(" ");
        
        const validEffects = [];
        const invalidEffects = [];
        
        for (const effect of effectsList) {
            if (effects[effect]) {
                validEffects.push(effect);
            } else {
                invalidEffects.push(effect);
            }
        }
        
        if (validEffects.length === 0) {
            return reply(`❌ No valid effects found. Invalid: ${invalidEffects.join(', ')}`);
        }
        
        if (invalidEffects.length > 0) {
            await reply(`⚠️ Note: Skipping invalid effects: ${invalidEffects.join(', ')}`);
        }
        
        await reply(`🔄 Creating ${validEffects.length} logos...`);
        
        const createdLogos = [];
        
        for (const effect of validEffects) {
            try {
                const result = await createLogo(effects[effect].url, text);
                
                if (result.success) {
                    createdLogos.push({
                        effect: effect,
                        imageUrl: result.imageUrl
                    });
                    
                    // Send each logo as it's created
                    await conn.sendMessage(from, {
                        image: { url: result.imageUrl },
                        caption: `✨ ${effect}: ${text} (${createdLogos.length}/${validEffects.length})`
                    });
                    
                    // Small delay to avoid rate limiting
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            } catch (e) {
                console.error(`Failed to create ${effect}:`, e.message);
            }
        }
        
        if (createdLogos.length === 0) {
            return reply("❌ Failed to create any logos.");
        }
        
        await reply(`✅ Created ${createdLogos.length}/${validEffects.length} logos successfully!`);
        
    } catch (e) {
        return reply(`❌ Error: ${e.message}`);
    }
});

cmd({
    pattern: "logo info",
    desc: "Get information about a logo effect",
    category: "logo",
    react: "ℹ️",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    try {
        if (!args.length) {
            return reply("❌ Please specify an effect.\nExample: .logo info naruto\nUse .logo list to see all effects.");
        }
        
        const effect = args[0].toLowerCase();
        
        if (!effects[effect]) {
            return reply(`❌ Effect "${effect}" not found.\nUse .logo list to see all effects.`);
        }
        
        const info = effects[effect];
        
        const message = `ℹ️ *${effect.charAt(0).toUpperCase() + effect.slice(1)} Effect*\n\n` +
                       `📝 *Description:* ${info.desc}\n` +
                       `🔗 *URL:* ${info.url}\n\n` +
                       `💡 *Usage:* .${effect} [text]\n` +
                       `📌 *Example:* .${effect} My Text`;
        
        await reply(message);
        
    } catch (e) {
        return reply(`❌ Error: ${e.message}`);
    }
});

cmd({
    pattern: "logo help",
    desc: "Help for logo commands",
    category: "logo",
    react: "❓",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    const helpText = `🎨 *Logo Generator Help*\n\n` +
                    `*Available Commands:*\n` +
                    `• .[effect] [text] - Create specific effect\n` +
                    `• .logo list - List all effects\n` +
                    `• .logo search [term] - Search effects\n` +
                    `• .logo random [text] - Random effect\n` +
                    `• .logo batch [effects] [text] - Multiple effects\n` +
                    `• .logo info [effect] - Effect information\n` +
                    `• .logo help - This help message\n\n` +
                    `*Examples:*\n` +
                    `• .naruto Uzumaki\n` +
                    `• .neon Welcome\n` +
                    `• .logo batch naruto,neon,gold Hello\n\n` +
                    `*Note:* Some effects may take a few seconds to generate.`;
    
    await reply(helpText);
});
