import { param } from '../types'

const getOptions = ({ method, body, params }: param) => {
    const options = {
        method,
        headers: {
            params,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body,
    }

    if (body) {
        options.body = JSON.stringify(body)
    }

    return options
}

export default getOptions
