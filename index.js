const discord = require("./utils/discord")
const htb = require("./utils/htb")

const createChannels = async (category, name) => {
  let hintChannel = await discord.createChannel(`${name}-hints`, category.id)
  console.log("Channel Created:", hintChannel.name);
  let discussionChannel = await discord.createChannel(`${name}-discussion`, category.id)
  console.log("Channel Created:", discussionChannel.name);
}

async function main() {
    let boxes = await htb.getBoxes();
    let category = await discord.getCategory()
    let boxNames = boxes.map((x)=>x.name.toLowerCase())
    boxNames.map((name)=>createChannels(category,name))

}



main().then(() => console.log("")).catch((e) => console.error(e.message))
