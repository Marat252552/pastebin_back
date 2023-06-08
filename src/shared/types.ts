export type UploadFile_T = {
    ETag: string,
    Location: string,
    key: string,
    Key: string,
    Bucket: string
}

export type Pin_T = {
    _id: string,
    title: string,
    text: string,
    images: Image_T[],
    one_read: boolean,
    createdAt: Date,
    already_read: boolean
}

export type Image_T = {
    _id: string,
    file_name: string,
    key: string,
    link: string
}