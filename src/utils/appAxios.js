import axios from "axios";

const appAxios = axios.create({
    baseURL: "http://0.0.0.0:9200/"
})

export default appAxios