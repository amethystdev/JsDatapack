const utils = require("./utils/generator");
const fs = require('fs');
const path = require('path');
const { EventEmitter } = require('events');
const { Scoreboard, ScoreboardType } = require("./Scoreboard");

class Base extends EventEmitter {

    components = [];

    name = "";
    description = "";
    /**
     * @private
     */
    datapack;

    /**
     * Create a new Datapack
     * @param {String} name 
     * @param {String} description 
     */
    constructor(name, description) {
        super();
        this.name = name;
        this.description = description;
        this.currentTime = 0;
        this.generate();
        this.emit('ready');
        setTimeout(() => {
            this.init();
        }, 1000);
    }

    /**
     * @private
     */
    init() {
        this.once('update', this.startUpdate);
    }

    startUpdate() {
        setInterval(() => {
            this.currentTime++;
            this.emit('update', this.currentTime);
            this.generate();
        }, 1000);
    }

    /**
     * 
     * @param {String} name 
     * @param {ScoreboardType} type 
     */
    createScoreboard(name, type) {
        var scoreboard = new Scoreboard(name, type);
        this.components.push(scoreboard);
        return scoreboard;
    }

    /**
     * @private
     */
    generate() {
        this.datapack = utils.createMainFolder(this.name, this.description);
    }

    save() {
        for(var i = 0; i < this.components.length; i++) {
            utils.createMcFunction(this.name, this.components[i].name, this.components[i].generate());
            this.components.splice(i, 1);
        }
        utils.save(this.name);
    }

    /**
     * Save a datapack to a path,
     * Like .minecraft
     * @param {String} path 
     * @deprecated
     */
    saveLocation(currentPath, newPath) {
        
        while(utils.exists(currentPath + "\\" + this.name + "-datapack.zip")) {
            if(utils.exists(currentPath + "\\" + this.name + "-datapack.zip")) {
                const cp = path.join(currentPath, this.name + "-datapack.zip");
                const np = path.join(newPath, this.name + "-datapack.zip");

                try {
                    fs.renameSync(cp, np);
                } catch(err) {
                    throw err;
                }
                break;
            }
        }
    }

}

module.exports = Base;