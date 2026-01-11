const fs = require("fs")
const pathModule = require("path")

const base = "toolset/thingy-build-system/scripts/"
const updateToolsScript = base + "update-tools.sh"


module.exports = {
    thingytype: "general",
    getScripts: () => {
        return {
            // shellscripts to be called
            "update-tools": updateToolsScript
        }
    },
    getDependencies: () => {        
        return {}
    },
    produceConfigFiles: (projectRoot) => {
        return
    }
}