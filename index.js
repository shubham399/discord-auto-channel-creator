const discord = require("./utils/discord")
const htb = require("./utils/htb")
let cateogry = process.env.CATEOGRY || "box"

const createChannelsWithHint = async (category, name) => {
  let hintChannel = await discord.createChannel(`${name}-hints`, category.id)
  console.log("Channel Created:", hintChannel.name);
  let discussionChannel = await discord.createChannel(`${name}-discussion`, category.id)
  console.log("Channel Created:", discussionChannel.name);
}
const createChannels = async (category, name) => {
  let channel = await discord.createChannel(`${name}`, category.id)
  console.log("Channel Created:", channel.name);
}

const archiveChannels  = async (channel,parentId) => {
 let archiveChannel = await discord.updateChannel(channel.id, parentId)
 console.log("Archived Created:", archiveChannel.name);
}

async function main() {
    let boxes = await htb.getBoxes();
    let category = await discord.getCategory(cateogry)
    let channels = await discord.getChannelsInCategory(category.id)
    let channelsName = channels.map(x=>x.name.toLowerCase()).map(x=>x.split('-')[0]).filter(x=>x !='request')
    let uniqueChannels = [...new Set([...channelsName])];
    let boxNames = boxes.map((x)=>x.name.toLowerCase())
    let filterBoxName = boxNames.map(x=> uniqueChannels.filter(y=> x == y)).flat()
    let notPresentBox = uniqueChannels.filter(function(obj) { return boxNames.indexOf(obj) == -1; });
    let archivingChannel = notPresentBox.map(x=> channels.filter(y=> y.name.includes(x))).flat()
    // Archive Channel
    let archiveCategory = await discord.getCategory('archive')
    archivingChannel.map(channel=> archiveChannels(channel,archiveCategory.id) )
    // Create Box name
    boxNames.map((name)=>createChannelsWithHint(category,name))
    // Create StartingPoint
    let startingpointCategory = await discord.getCategory('StartingPoint')
    let startingpoint = await htb.getStartingPointBox();
    let startingpointNames = startingpoint.map(x=>x.name.toLowerCase())
    startingpointNames.map((name)=>createChannels(startingpointCategory,name))

}



main().then(() => console.log("")).catch((e) => console.error(e.message))
