import path from "path";
import s3 from "./YandexBucketInit";


export let UploadImage = async (image_name: string) => {
    let upload = await s3.Upload(
        {
            path: path.resolve(__dirname, './../', 'operative', image_name),
            save_name: true
        },
        '/images/'
    );
    return upload
}