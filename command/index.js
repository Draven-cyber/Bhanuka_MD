const commands = [];
const replyHandlers = [];

function cmd(info, func) {
    if (!info) info = {};

    info.function = func;

    info.pattern = info.pattern || null;
    info.desc = info.desc || '';
    info.category = info.category || 'misc';
    info.filename = info.filename || 'unknown';
    info.fromMe = info.fromMe ?? false;
    info.dontAddCommandList = info.dontAddCommandList ?? false;

    if (!info.pattern && typeof info.filter === 'function') {
        replyHandlers.push(info);
    } else {
        commands.push(info);
    }

    return info;
}

module.exports = {
    cmd,
    AddCommand: cmd,
    Function: cmd,
    Module: cmd,
    commands,
    replyHandlers
};
