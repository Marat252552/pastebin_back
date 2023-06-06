export type CreatePinReq_T = {
    body: {
        files_UIDs: string[],
        text: string,
        session_id: string,
        title: string,
        one_read: boolean
    }
}

export type GetPinReq_T = {
    params: {
        _id: string
    }
}