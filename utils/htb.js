const axios = require("axios")
const base = "https://www.hackthebox.eu/api"
const token = process.env.HTB_TOKEN


const getBoxes = async () => {
    try {
        let url = `${base}/machines/get/all?api_token=${token}`
        let response = await axios.get(url)
        return response.data.filter(x => x.retired == false)
    }
    catch (e) {
        console.error("getBoxes Error", e.message)
    }

}
//
// curl --location --request GET 'https://www.hackthebox.eu/api/startingpoint/machines' \
const getStartingPointBox = async () => {
    try {
        let url = `${base}/startingpoint/machines`
        let headers = {
            "Authorization": `Bearer ${token}`
        }
        let response = await axios.get(url, { headers })
        return response.data
    }
    catch (e) {
        console.error("getStartingPointBox Error", e.message)
    }

}


exports.getBoxes = getBoxes;
exports.getStartingPointBox = getStartingPointBox;
