const axios = require("axios")
const base = "https://discord.com/api/v8"
let auth = {
    "Authorization": `Bot ${process.env.BOT_TOKEN}`
}
let contentType = {
    'Content-Type': 'application/json'
}

let guid = process.env.GUILD_ID

const createChannel = async (name, parentId) => {
    name = name.replace(/\s/g, "-").toLowerCase();
    isExist = await channelExist(name)
    if (!isExist) {
        let url = `${base}/guilds/${guid}/channels`
        let data = {
            "name": name,
            "type": 0,
            "parent_id": parentId,
            "lockPermissions": true
        }
        let headers = Object.assign(auth, contentType)
        let response = await axios.post(url, JSON.stringify(data), {
            headers
        })
        return response.data
    } else {
        return isExist
    }
}

const channelExist = async (name) => {
    let url = `${base}/guilds/${guid}/channels`
    let response = await axios.get(url, {
        headers: auth
    });
    return response.data.find(c => c.name.toLowerCase().includes(name))
}
const getCategory = async (cateogry) => {
    let url = `${base}/guilds/${guid}/channels`
    let response = await axios.get(url, {
        headers: auth
    });
    return response.data.filter(x => x.type == 4).find(c => c.name.toLowerCase().includes(cateogry.toLowerCase()))
}


exports.getCategory = getCategory;
exports.createChannel = createChannel;
