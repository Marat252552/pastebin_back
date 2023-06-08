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
const PinModel_1 = __importDefault(require("./database/Models/PinModel"));
const Actions_1 = require("./yandex_files/Actions");
const AutoPinsDeleter = () => {
    setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        var _a, e_1, _b, _c, _d, e_2, _e, _f, _g, e_3, _h, _j, _k, e_4, _l, _m;
        try {
            let pins = yield PinModel_1.default.findExpired();
            try {
                for (var _o = true, pins_1 = __asyncValues(pins), pins_1_1; pins_1_1 = yield pins_1.next(), _a = pins_1_1.done, !_a; _o = true) {
                    _c = pins_1_1.value;
                    _o = false;
                    const pin = _c;
                    let images = pin.images;
                    try {
                        for (var _p = true, images_1 = (e_2 = void 0, __asyncValues(images)), images_1_1; images_1_1 = yield images_1.next(), _d = images_1_1.done, !_d; _p = true) {
                            _f = images_1_1.value;
                            _p = false;
                            const image = _f;
                            yield (0, Actions_1.DeleteFile)(image.key);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (!_p && !_d && (_e = images_1.return)) yield _e.call(images_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    yield PinModel_1.default.deleteOne({ _id: pin._id });
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_o && !_a && (_b = pins_1.return)) yield _b.call(pins_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            let disposed_pins = yield PinModel_1.default.findDisposed();
            try {
                for (var _q = true, disposed_pins_1 = __asyncValues(disposed_pins), disposed_pins_1_1; disposed_pins_1_1 = yield disposed_pins_1.next(), _g = disposed_pins_1_1.done, !_g; _q = true) {
                    _j = disposed_pins_1_1.value;
                    _q = false;
                    const disposed_pin = _j;
                    disposed_pin;
                    let images = disposed_pin.images;
                    try {
                        for (var _r = true, images_2 = (e_4 = void 0, __asyncValues(images)), images_2_1; images_2_1 = yield images_2.next(), _k = images_2_1.done, !_k; _r = true) {
                            _m = images_2_1.value;
                            _r = false;
                            const image = _m;
                            yield (0, Actions_1.DeleteFile)(image.key);
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (!_r && !_k && (_l = images_2.return)) yield _l.call(images_2);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                    yield PinModel_1.default.deleteOne({ _id: disposed_pin._id });
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (!_q && !_g && (_h = disposed_pins_1.return)) yield _h.call(disposed_pins_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        catch (e) {
            console.log(e);
        }
    }), 20000);
};
exports.default = AutoPinsDeleter;
