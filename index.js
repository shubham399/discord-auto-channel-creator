const discord = require("./utils/discord")

async function main() {
    let category = await discord.getCategory()
    console.log("Category Id:", category.id);
    let newChannel = await discord.createChannel("sharp discussion", category.id)
    console.log("Channel Created:", newChannel.name);
}



main().then(() => console.log("")).catch((e) => console.error(e.message))
