const checkErrorStatus = (res: any) => {
    if (!res.ok) {
        throw new Error(res.statusText)
    }
}

export default checkErrorStatus
