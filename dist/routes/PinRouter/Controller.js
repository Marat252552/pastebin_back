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
const PinModel_1 = __importDefault(require("../../database/Models/PinModel"));
const FileModel_1 = __importDefault(require("../../database/Models/FileModel"));
const fs_1 = __importDefault(require("fs"));
class Controller {
    createPin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { files_UIDs, text, session_id, title } = req.body;
                if (!text || !title || title.length > 19 || !session_id || !files_UIDs) {
                    return res.sendStatus(400);
                }
                let files = yield FileModel_1.default.find({ session_id });
                let images_names = [];
                files.forEach(file => {
                    let { uid } = file;
                    let new_file_name = uid + '.' + file.mimetype.split('/')[1];
                    // checking whether this file exists
                    if (!files_UIDs.find(el => el === uid))
                        return;
                    let newPath = path_1.default.resolve(__dirname, './../../', 'static', new_file_name);
                    let oldPath = path_1.default.resolve(__dirname, './../../', 'operative', uid);
                    fs_1.default.rename(oldPath, newPath, function (err) {
                        if (err) {
                            console.log(err);
                        }
                        console.log('Successfully renamed - AKA moved!');
                    });
                    images_names.push(new_file_name);
                });
                let pin = yield PinModel_1.default.create({ images_names, text, title });
                let link = process.env.FRONT_URL + '/view/' + pin._id;
                res.status(200).json({ link });
            }
            catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        });
    }
    getPin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { _id } = req.params;
                let pin = yield PinModel_1.default.findOne({ _id });
                if (!pin)
                    return res.sendStatus(400);
                res.status(200).json({ pin });
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
exports.default = new Controller();
