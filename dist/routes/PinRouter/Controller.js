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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PinModel_1 = __importDefault(require("../../database/Models/PinModel"));
const FileModel_1 = __importDefault(require("../../database/Models/FileModel"));
const Actions_1 = require("../../yandex_files/Actions");
class Controller {
    createPin(req, res) {
        var _a, e_1, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { files_UIDs, text, session_id, title, one_read } = req.body;
                if (!text || !title || title.length > 20 || text.length > 200 || !session_id) {
                    return res.sendStatus(400);
                }
                let files = yield FileModel_1.default.find({ session_id });
                let images_links = [];
                if (files[0]) {
                    try {
                        for (var _d = true, files_1 = __asyncValues(files), files_1_1; files_1_1 = yield files_1.next(), _a = files_1_1.done, !_a; _d = true) {
                            _c = files_1_1.value;
                            _d = false;
                            const file = _c;
                            let { file_name, uid } = file;
                            // checking whether this file exists
                            if (files_UIDs.find(el => el === uid)) {
                                let uploadInfo = yield (0, Actions_1.UploadImage)(file_name);
                                images_links.push(uploadInfo.Location);
                            }
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (!_d && !_a && (_b = files_1.return)) yield _b.call(files_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
                let pin = yield PinModel_1.default.create({ images_links, text, title, one_read });
                let link = process.env.FRONT_URL + '/view/' + pin._id;
                res.status(200).json({ link, pin_id: pin._id });
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
                    return res.sendStatus(404);
                if (pin.one_read) {
                    yield PinModel_1.default.deleteOne({ _id });
                    // pin.images_names.forEach(image_name => {
                    //     fs.unlink(path.resolve(__dirname, './../../', 'static', image_name!), (err) => {
                    //         if (err) {
                    //             console.log(err)
                    //         } else {
                    //             console.log("Delete File successfully.");
                    //         }
                    //     });
                    // })
                }
                res.status(200).json({ pin });
            }
            catch (e) {
                console.log(e);
                res.sendStatus(404);
            }
        });
    }
}
exports.default = new Controller();
