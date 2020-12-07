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

async function main() {
    let boxes = await htb.getBoxes();
    let category = await discord.getCategory(cateogry)
    let boxNames = boxes.map((x)=>x.name.toLowerCase())
    boxNames.map((name)=>createChannelsWithHint(category,name))
    let startingpointCategory = await discord.getCategory('StartingPoint')
    let startingpoint = await htb.getStartingPointBox();
    let startingpointNames = startingpoint.map(x=>x.name.toLowerCase())
    startingpointNames.map((name)=>createChannels(startingpointCategory,name))

}



main().then(() => console.log("")).catch((e) => console.error(e.message))
