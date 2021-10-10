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

const createChannel = async (name, parentId = null) => {
    try {
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
    catch (e) {
        console.error("Create Channel Error", e.message)
    }
}

const updateChannel = async (channelId, parentId = null, permission = null) => {
    try {
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
    catch (e) {
        console.error("Update Channel Error", e.message)
    }
}

const channelExist = async (name, parentId) => {
    try {
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
    catch (e) {
        console.error("Channel Exist Error", e.message)
    }
}

const getChannelsInCategory = async (parentId) => {
    try {
        let url = `${base}/guilds/${guid}/channels`
        let response = await axios.get(url, {
            headers: auth
        });
        return response.data.filter(c => c.parent_id == parentId)
    }
    catch (e) {
        console.error("getChannelsInCategory Error", e.message)
    }
}

const getCategory = async (cateogry) => {
    try {
        let url = `${base}/guilds/${guid}/channels`
        let response = await axios.get(url, {
            headers: auth
        });
        return response.data.filter(x => x.type == 4).find(c => c.name.toLowerCase().includes(cateogry.toLowerCase()))
    } catch (e) {
        console.error("getCategory Error", e.message)
    }
}


const deleteChannel = async (channelId) => {
    try {
        let url = `${base}/channels/${channelId}`
        let headers = Object.assign(auth, contentType)
        let response = await axios.delete(url, {
            headers
        })
        return response.data
    }
    catch (e) {
        console.error("deleteChannel Error", e.message)
    }
}

exports.getCategory = getCategory;
exports.createChannel = createChannel;
exports.getChannelsInCategory = getChannelsInCategory;
exports.updateChannel = updateChannel;
exports.deleteChannel = deleteChannel;
