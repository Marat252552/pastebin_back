import fs from 'fs'
import GetPathToOperativeFolder from '../../../shared/GetPathToOperative';


const DeleteFileFromOperativeFolder = (file_name: string) => {
    return new Promise((resolve, reject) => {
        try {
            fs.unlink(GetPathToOperativeFolder() + file_name, async (err) => {
                if (err) {
                    console.log('ERROR - delete from operative folder')
                    console.log(err)
                    reject()
                } else {
                    console.log('SUCCESS - delete from operative folder')
                }
            });
            resolve(null)
        } catch(e) {
            console.log(e)
            reject()
        }
    })
}

export default DeleteFileFromOperativeFolder