const fs = require('fs');
const archiver = require('archiver');
const path = require('path');

const datapacks = require('../../utils').path;


/**
 * 
 * @param {String} name 
 * @param {String} description 
 */
function createMainFolder(name, description) {
    name = name.toLowerCase();
    if(exists(name)) {
        return new Error("That is already a datapack");
    }

    // CREATE DATAPACK FOLDER

    var datapack = datapacks + name;
    fs.mkdirSync(datapack);

    // CREATE MCMETA FILE


    var mcMetaTemp = {
        "pack": {
            "pack_format": 5,
            "description": description
        }
    }
    fs.writeFileSync(datapack + "/pack.mcmeta", JSON.stringify(mcMetaTemp, null, 4));

    // CREATE DATA FOLDER

    var dataFolder = datapack + "/data";
    fs.mkdirSync(dataFolder);

    // CREATE NAMESPACE

    var namespace = dataFolder + "/" + name;
    fs.mkdirSync(namespace);
    
    // NAMESPACE CHILDREN

    var nsfunctions = namespace + "/functions";
    fs.mkdirSync(nsfunctions);

    fs.writeFileSync(nsfunctions + "/tick.mcfunction", "");
    fs.writeFileSync(nsfunctions + "/load.mcfunction", require('../templates/loadTemplate'));

    // CREATE MINECRAFT NAMESPACE

    var mcnamespace = dataFolder + "/minecraft";
    fs.mkdirSync(mcnamespace);

    // MC NAMESPACE CHILDREN

    var tags = mcnamespace + "/tags";
    fs.mkdirSync(tags);

    var functions = tags + "/functions";
    fs.mkdirSync(functions);

    // FUNCTIONS CHILDREN

    var tickTemp = {
        "values": [
            `${name}:tick`
        ]
    }
    fs.writeFileSync(functions + "/tick.json", JSON.stringify(tickTemp, null, 4));
    var loadTemp = {
        "values": [
            `${name}:load`
        ]
    }
    fs.writeFileSync(functions + "/load.json", JSON.stringify(loadTemp, null, 4));

    console.log(`Created ${name}`);
    return datapack;
}

module.exports.createMainFolder = createMainFolder;

//#######################################\\
//            UTIL FUNCTIONS             \\
//#######################################\\

/**
 * Save a datapack.
 * @param {String} name 
 */
function save(name) {
    name = name.toLowerCase();
    if(!exists(name)) {
        return new Error("That is not a datapack");
    }

    var output = fs.createWriteStream(name + "-datapack.zip");
    var archive = archiver('zip');
    // output.on('close', function() {
    //     console.log(archive.pointer() + ' total bytes.');
    //     console.log("Made into a zip.");
    // });

    archive.on('error', function(err) {
        throw err;
    });

    archive.pipe(output);
    archive.directory(__dirname + "/datapacks/" + name, false);
    archive.finalize();
}

module.exports.save = save;

/**
 * Create a mc function
 * @param {String} name 
 */
function createMcFunction(name, fileName, data) {
    var path = datapacks + name + "/data/" + name + "/functions/";
    if(!fileExists(path + fileName + ".mcfunction")) {
        fs.writeFileSync(path + fileName + ".mcfunction", data);
    }
}

module.exports.createMcFunction = createMcFunction;

/**
 * Save ZIP file to a path.
 * @param {String} name
 * @param {String} path 
 */
function saveTo(path, newPath) {
    fs.rename(path, newPath, (err) => {
        if(err) throw err;
    });
}

module.exports.saveTo = saveTo;

/**
 * Delete a datapack folder.
 * @param {String} name 
 */
function delDatapack(name) {
    name = name.toLowerCase();
    fs.rmdirSync(datapacks + name);
}

/**
 * See if a datapack exists.
 * @param {String} name 
 * @returns {Boolean}
 */
function exists(name) {
    name = name.toLowerCase();
    return fs.existsSync(datapacks + name);
}

/**
 * 
 * @param {String} path 
 */
function fileExists(path) {
    return fs.existsSync(path);
}

module.exports.exists = fileExists;