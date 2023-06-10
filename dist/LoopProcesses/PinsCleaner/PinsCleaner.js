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
const PinModel_1 = __importDefault(require("../../DataFlow/mongo_database/Models/PinModel"));
const TimePeriods_1 = require("../../shared/TimePeriods");
const DeleteFromMongoAndYandex_1 = __importDefault(require("./processes/DeleteFromMongoAndYandex"));
// Searches for expired and disposed pins and deletes them from mongo_database 
// and their corresponding files in yandex_cloud
const PinsCleaner = () => {
    setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Pins that have expiresAt value lower than Date.now()
            let expired_pins = yield PinModel_1.default.findExpired();
            yield (0, DeleteFromMongoAndYandex_1.default)(expired_pins);
            // Pins that have one_read true equal and views more than 1
            let disposed_pins = yield PinModel_1.default.findDisposed();
            yield (0, DeleteFromMongoAndYandex_1.default)(disposed_pins);
        }
        catch (e) {
            console.log('AutoPinsDeleter Error');
            console.log(e);
        }
    }), TimePeriods_1.TEN_MINUTES);
};
exports.default = PinsCleaner;
