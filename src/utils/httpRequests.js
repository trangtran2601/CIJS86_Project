import axios from "axios";

const httpRequest = axios.create({
    baseURL: 'https://provinces.open-api.vn/api/'
})

export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options)
    return response.data
}

export default httpRequest