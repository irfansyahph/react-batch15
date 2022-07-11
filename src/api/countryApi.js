import axios from 'axios'
import config from '../config/config'

const get = async () => {
    try {
        const result = await axios.get(`${config.domain}/countries`)
        return result.data
    } catch (error) {
        return await error.message
    }
}

const create = async (payload) => {
    try {
        const result = await axios.post(`${config.domain}/countries/`, payload)
        return result
    } catch (error) {
        return await error.message
    }
}

const deleted = async (id) => {
    try {
        const result = await axios.delete(`${config.domain}/countries/${id}`)
        return result
    } catch (error) {
        return await error.message
    }
}
export default { get, create, deleted }