

class Controller {
    async connect(req: any, res: any) {
        try {
            res.status(200).send('Hello world')
        } catch(e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
}

export default new Controller()