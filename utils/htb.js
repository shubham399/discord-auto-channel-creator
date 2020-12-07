const axios = require("axios")
const base = "https://www.hackthebox.eu/api"
const token = process.env.HTB_TOKEN


const getBoxes = async () => {
    let url = `${base}/machines/get/all?api_token=${token}`
    let response = await axios.get(url)
    return response.data.filter(x => x.retired == false)

}
//
// curl --location --request GET 'https://www.hackthebox.eu/api/startingpoint/machines' \
// --header 'Authorization: Bearer rSCd2lsr1pP79waOsGMcIofa9AFWg0BEgbJYuJmYvsB2jLx7ybV9yDrWkyEo'
const getStartingPointBox = async () => {
    let url = `${base}/startingpoint/machines`
    let headers = {
        "Authorization": `Bearer ${token}`
    }
    let response = await axios.get(url,{headers})
    return response.data

}


exports.getBoxes = getBoxes;
exports.getStartingPointBox = getStartingPointBox;
