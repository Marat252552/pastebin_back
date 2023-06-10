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
const PinModel_1 = __importDefault(require("../../DataFlow/mongo_database/Models/PinModel"));
const OperativeFileModel_1 = __importDefault(require("../../DataFlow/mongo_database/Models/OperativeFileModel"));
const Actions_1 = require("../../DataFlow/yandex_cloud/Actions");
const TimePeriods_1 = require("../../shared/TimePeriods");
class Controller {
    createPin(req, res) {
        var _a, e_1, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { files_UIDs, text, session_id, title, one_read, days_alive = 100 } = req.body;
                if (!text || !title || title.length > 20 || text.length > 200 || !session_id || days_alive > 100) {
                    return res.sendStatus(400);
                }
                let files = yield OperativeFileModel_1.default.find({ session_id });
                let images = [];
                if (files[0]) {
                    try {
                        for (var _d = true, files_1 = __asyncValues(files), files_1_1; files_1_1 = yield files_1.next(), _a = files_1_1.done, !_a; _d = true) {
                            _c = files_1_1.value;
                            _d = false;
                            const file = _c;
                            let { file_name, uid } = file;
                            // checking whether this file is required to be added
                            if (files_UIDs.find(el => el === uid)) {
                                let { key, Location } = yield (0, Actions_1.UploadImage)(file_name);
                                let image = { file_name, key, link: Location };
                                images.push(image);
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
                let days_in_timestamp_format = days_alive * TimePeriods_1.TWENTY_FOUR_HOURS;
                let expiresAt = Date.now() + days_in_timestamp_format;
                let pin = yield PinModel_1.default.create({ images, text, title, one_read, expiresAt });
                res.status(200).json({
                    pin_id: pin._id
                });
            }
            catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        });
    }
    getPin(req, res) {
        var _a, e_2, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { _id } = req.params;
                let pin = yield PinModel_1.default.findOne({ _id });
                if (!pin)
                    return res.sendStatus(404);
                if (pin.one_read && pin.views >= 1) {
                    yield PinModel_1.default.deleteOne({ _id });
                    try {
                        for (var _d = true, _e = __asyncValues(pin.images), _f; _f = yield _e.next(), _a = _f.done, !_a; _d = true) {
                            _c = _f.value;
                            _d = false;
                            const image = _c;
                            yield (0, Actions_1.DeleteFile)(image.key);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    res.sendStatus(404);
                }
                else {
                    yield PinModel_1.default.addView(_id);
                    res.status(200).json({ pin });
                }
            }
            catch (e) {
                console.log(e);
                res.sendStatus(404);
            }
        });
    }
}
exports.default = new Controller();
