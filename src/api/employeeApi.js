import axios from 'axios'
import config from '../config/config'

const get = async () => {
    try {
        const result = await axios.get(`${config.domain}/employees`)
        return result.data
    } catch (error) {
        return await error.message
    }
}

export default { get }