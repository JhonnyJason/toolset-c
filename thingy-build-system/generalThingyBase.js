//############################################################
const pathModule = require("path")
const fs = require("fs")

//############################################################
const stdAuthor = "Lenard Frommelt"
const stdInitialVersion = "0.0.1"
const stdLicense = "CC0"

//############################################################
const base = "toolset/thingy-build-system/"

//############################################################
//#region 
const getThingyName = () => {
    var cwd = process.cwd()
    // console.log("getBase in cwd: " + cwd)
    var directoryChain = cwd.split(pathModule.sep)
    if(directoryChain.length < 2) {
        throw new Error("Unexpected cwd: " + cwd + "\n Too small path depth!")
    } else if(directoryChain[directoryChain.length - 1] != "toolset") {
        throw new Error("Unexpected cwd: " + cwd + "\n the last directory is not 'toolset'")
    }

    return directoryChain[directoryChain.length - 2]
} 

const getThingyRemote = () => {
    const gitConfigPath = pathModule.resolve("../.git/config")
    const gitConfig = fs.readFileSync(gitConfigPath, "utf8")
    const remoteSegment = '[remote "origin"]'
    const urlSegment = "\n\turl = "
    const fetchSegment = "\n\tfetch = "
    const remoteSegmentIndex = gitConfig.indexOf(remoteSegment)
    const urlSegmentIndex = gitConfig.indexOf(urlSegment, remoteSegmentIndex)
    const fetchSegmentIndex = gitConfig.indexOf(fetchSegment, urlSegmentIndex)
    const remoteStart = urlSegmentIndex + urlSegment.length
    const remoteEnd = fetchSegmentIndex
    const result = gitConfig.slice(remoteStart, remoteEnd)
    
    let httpsResult = ""

    if(result.substr(0, 8) == "https://") httpsResult = result
    if(result.substr(0, 4) == "git@") {
        httpsResult = result.replace(":", "/")
        httpsResult = httpsResult.replace("git@", "https://")
    } else {
        throw "Remote was neither started with https:// nor git@"
    }
    if(httpsResult.lastIndexOf(".git") == (httpsResult.length - 4))
        httpsResult = httpsResult.slice(0, -4)
    return httpsResult
}

const getBaseScripts = (name) => {
    return {
        "ncu-update": "ncu -u",
        "reinstall": "pnpm install",
        "update-packages":"run-s -ns ncu-update reinstall",

        "push": "thingysync push --message",
        "pull": "thingysync pull",
    }
}

const getRepository = (remoteURL) => {
    return {
        "type": "git",
        "url": "git+" + remoteURL + ".git"  
    }
}

const getBugs = (remoteURL) => {
    return {
        "url": remoteURL + "/issues"
    }
}

const getHomepage = (remoteURL) => {
    return remoteURL + "#readme"
} 

const getBaseDependencies = ()  => {
    return {
        "npm-check-updates": "^19.3.1",
        "npm-run-all": "^4.1.5",
        "thingysync": "^0.1.2"
    }
}

const getDescription = () => {
    return "This is the description :-)"
}

//#endregion

//############################################################
module.exports = {
    getBase: () => {
        const name = getThingyName()
        const remoteURL = getThingyRemote()
        const version = stdInitialVersion
        const description = getDescription()
        const scripts = getBaseScripts()
        const repository = getRepository(remoteURL)
        const author = stdAuthor
        const license = stdLicense
        const bugs = getBugs(remoteURL)
        const homepage = getHomepage(remoteURL)
        const dependencies = getBaseDependencies()
        const type = "module"
        return {
            name,
            version,
            description,
            scripts,
            repository,
            author,
            license,
            bugs,
            homepage,
            dependencies,
            type
        }
    }
}