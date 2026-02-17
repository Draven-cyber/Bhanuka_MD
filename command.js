// command.js

const commands = [];
const replyHandlers = [];

/**
 * Register a command or reply handler
 * @param {Object} info Command info
 * @param {Function} func Command function
 */
function cmd(info = {}, func) {
    if (typeof func !== "function") {
        throw new Error("Command function must be a function");
    }

    // Clone info to avoid mutation bugs
    const data = { ...info };

    // Attach handler
    data.function = func;

    // ===== Default values (safe) =====
    if (typeof data.dontAddCommandList === "undefined")
        data.dontAddCommandList = false;

    if (typeof data.desc === "undefined")
        data.desc = "";

    if (typeof data.category === "undefined")
        data.category = "misc";

    if (typeof data.filename === "undefined")
        data.filename = "Not Provided";

    if (typeof data.fromMe === "undefined")
        data.fromMe = false;

    if (!Array.isArray(data.alias))
        data.alias = [];

    // ===== Pattern validation =====
    if (
        data.pattern &&
        typeof data.pattern !== "string" &&
        !(data.pattern instanceof RegExp)
    ) {
        throw new Error("pattern must be a string or RegExp");
    }

    // ===== Register =====
    if (!data.pattern && typeof data.filter === "function") {
        // Reply-based handler
        replyHandlers.push(data);
    } else {
        // Normal command
        commands.push(data);
    }

    return data;
}

module.exports = {
    cmd,
    AddCommand: cmd,
    Function: cmd,
    Module: cmd,
    commands,
    replyHandlers
};
