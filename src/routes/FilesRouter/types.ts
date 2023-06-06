export type UploadFileReq_T = {
    body: {
        session_id: string,
        uid: string
    },
    files: {
        file: any
    }
}