const Main = require("../Main");

const ScoreboardDisplayType = {
    SIDEBAR: 1,
    UNDER_NAME: 2,
    LIST: 3,
    TEAMS: {
        RED: 4,
        GREEN: 5,
        BLUE: 6
    }
}
Object.freeze(ScoreboardDisplayType);

const ScoreboardType = {
    DUMMY: "dummy"
}
Object.freeze(ScoreboardType);

class Scoreboard extends Main {

    base;
    name = "";
    type;

    displayName = null;

    displaySlot;

    /**
     * 
     * @param {String} name 
     * @param {ScoreboardType} type
     */
    constructor(name, type) {
        super();
        this.name = name;
        this.type = type;
    }

    /**
     * 
     * @param {ScoreboardDisplayType} type 
     */
    setDisplaySlot(type) {
        this.displaySlot = type;
    }

    /**
     * Sets the display name of a scoreboard.
     * For colors use the toColor method.
     * @param {Object} textObject 
     */
    setDisplayName(textObject) {
        this.displayName = textObject;
    }

    generate() {
        var val;
        if(this.displayName == null) {
            val = `scoreboard objectives add ${this.name} ${this.type}`;
        } else {
            val = `scoreboard objectives add ${this.name} ${this.type} ${this.displayName}`;
        }
        return val;
    }

}

module.exports.Scoreboard = Scoreboard;
module.exports.ScoreboardDisplayType = ScoreboardDisplayType;
module.exports.ScoreboardType = ScoreboardType;