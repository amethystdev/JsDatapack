const Base = require("./classes/Base");
const { Scoreboard, ScoreboardDisplayType, ScoreboardType } = require('./classes/Scoreboard');
const { toColor } = require("./utils");

module.exports = {
    Base: Base,
    //Scoreboards
    Scoreboard: Scoreboard,
    ScoreboardDisplayType: ScoreboardDisplayType,
    ScoreboardType: ScoreboardType,
    //Color
    toColor: toColor,
}