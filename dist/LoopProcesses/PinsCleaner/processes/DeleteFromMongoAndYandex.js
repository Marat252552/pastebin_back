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
const PinModel_1 = __importDefault(require("../../../DataFlow/mongo_database/Models/PinModel"));
const Actions_1 = require("../../../DataFlow/yandex_cloud/Actions");
const DeleteFromMongoAndYandex = (pins) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, e_1, _b, _c, _d, e_2, _e, _f;
        try {
            try {
                for (var _g = true, pins_1 = __asyncValues(pins), pins_1_1; pins_1_1 = yield pins_1.next(), _a = pins_1_1.done, !_a; _g = true) {
                    _c = pins_1_1.value;
                    _g = false;
                    const pin = _c;
                    let images = pin.images;
                    try {
                        for (var _h = true, images_1 = (e_2 = void 0, __asyncValues(images)), images_1_1; images_1_1 = yield images_1.next(), _d = images_1_1.done, !_d; _h = true) {
                            _f = images_1_1.value;
                            _h = false;
                            const image = _f;
                            yield (0, Actions_1.DeleteFile)(image.key);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (!_h && !_d && (_e = images_1.return)) yield _e.call(images_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    yield PinModel_1.default.deleteOne({ _id: pin._id });
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_g && !_a && (_b = pins_1.return)) yield _b.call(pins_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            resolve(null);
        }
        catch (e) {
            console.log(e);
            console.log('DeleteFromMongoAndYandex error');
            reject();
        }
    }));
};
exports.default = DeleteFromMongoAndYandex;
