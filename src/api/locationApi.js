import axios from 'axios'
import config from '../config/config'

const get = async () => {
    try {
        const result = await axios.get(`${config.domain}/locations`)
        return result.data
    } catch (error) {
        return await error.message
    }
}
const create = async (payload) => {
    try {
        const result = await axios.post(`${config.domain}/locations/`, payload)
        return result
    } catch (error) {
        return await error.message
    }
}

const deleted = async (id) => {
    try {
        const result = await axios.delete(`${config.domain}/locations/${id}`)
        return result
    } catch (error) {
        return await error.message
    }
}

export default { get, create, deleted }