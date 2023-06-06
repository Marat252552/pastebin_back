"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const FileModel_1 = __importDefault(require("../../database/Models/FileModel"));
class Controller {
    uploadFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { file } = req.files;
                let { session_id, uid } = req.body;
                let mimetype = file.mimetype;
                // let image_type = mimetype.split('/')[1]
                if (file.size > 2000000) {
                    return res.status(413).json({ message: 'Размер файла не может быть больше 2х Мбайт' });
                }
                let ONE_HOUR = 3600000;
                let THIRTY_SECONDS = 30000;
                let TEN_MINUTES = 600000;
                let TEN_SECONDS = 10000;
                // Time in future when this file should be auto deleted if not used
                let exp_timestamp = Date.now() + ONE_HOUR;
                yield FileModel_1.default.create({
                    uid, mimetype, exp_timestamp, session_id
                });
                file.mv(path_1.default.resolve(__dirname, './../../', 'operative', uid));
                res.sendStatus(200);
            }
            catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        });
    }
}
exports.default = new Controller();
