const { Base, ScoreboardType, ScoreboardDisplayType } = require("../src/index");
const { toColor } = require("../src/utils");
const dp = new Base("test", "awd");
console.log(require("minecraft-folder-path"))

var scoreboard = dp.createScoreboard("Scoreboard", ScoreboardType.DUMMY);
scoreboard.setDisplaySlot(ScoreboardDisplayType.SIDEBAR);
scoreboard.setDisplayName(toColor("&3&lScoreboard"));

dp.on('ready', () => {
    console.log("Ready!");
});

// dp.on("update", (timer) => {
//     console.log("Timer: " + timer);
// })

dp.save();