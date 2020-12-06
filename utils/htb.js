const axios = require("axios")
const base = "https://www.hackthebox.eu/api"
const token = process.env.HTB_TOKEN


const getBoxes = async ()=>{
  let url = `${base}/machines/get/all?api_token=${token}`
  console.log(url);
  let response = await axios.get(url)
  return response.data.filter(x => x.retired == false)

}


exports.getBoxes = getBoxes;
