import path from "path";
import s3 from "./YandexBucketInit";
import GetPathToOperativeFolder from "../../shared/GetPathToOperative";


export let UploadImage = async (image_name: string) => {
    let upload = await s3.Upload(
        {
            path: GetPathToOperativeFolder() + image_name,
            save_name: true
        },
        '/images/'
    );
    return upload
}

export let DeleteFile = (key: string) => {
    return s3.Remove(key)
}