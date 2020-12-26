const axios = require("axios")
const base = "https://discord.com/api/v8"
let auth = {
    "Authorization": `Bot ${process.env.BOT_TOKEN}`
}
let contentType = {
    'Content-Type': 'application/json'
}

let cache = [];
let guid = process.env.GUILD_ID

const createChannel = async (name, parentId=null) => {
    name = name.replace(/\s/g, "-").toLowerCase();
    isExist = await channelExist(name, parentId)
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

const updateChannel = async (channelId, parentId=null,permission=null) => {
    let url = `${base}/channels/${channelId}`
    let data = {
        "parent_id": parentId,
        "permission_overwrites": permission
    }
    let headers = Object.assign(auth, contentType)
    let response = await axios.patch(url, JSON.stringify(data), {
        headers
    })
    return response.data
}

const channelExist = async (name, parentId) => {
    let url = `${base}/guilds/${guid}/channels`
    found = cache.find(c => c.name.toLowerCase().includes(name))
    if (found) {
        console.log(`Found from Cache ${name}`);
        return found;
    } else {
        let response = await getChannelsInCategory(parentId)
        cache = response
        console.log(`Found from API ${name}`);
        return response.find(c => c.name.toLowerCase().includes(name))
    }
}

const getChannelsInCategory = async (parentId) => {
    let url = `${base}/guilds/${guid}/channels`
    let response = await axios.get(url, {
        headers: auth
    });
    return response.data.filter(c => c.parent_id == parentId)
}

const getCategory = async (cateogry) => {
    let url = `${base}/guilds/${guid}/channels`
    let response = await axios.get(url, {
        headers: auth
    });
    return response.data.filter(x => x.type == 4).find(c => c.name.toLowerCase().includes(cateogry.toLowerCase()))
}


const deleteChannel = async (channelId) =>{
    let url = `${base}/channels/${channelId}`
    let headers = Object.assign(auth, contentType)
    let response = await axios.delete(url,{
        headers
    })
    return response.data
}

exports.getCategory = getCategory;
exports.createChannel = createChannel;
exports.getChannelsInCategory = getChannelsInCategory;
exports.updateChannel = updateChannel;
exports.deleteChannel = deleteChannel;
