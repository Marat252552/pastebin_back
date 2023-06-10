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
const OperativeFile_1 = __importDefault(require("../DataFlow/database/Models/OperativeFile"));
const fs_1 = __importDefault(require("fs"));
const GetPathToOperative_1 = __importDefault(require("../shared/GetPathToOperative"));
const TimePeriods_1 = require("../shared/TimePeriods");
const OperativeFilesChecker = () => {
    setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let files = yield OperativeFile_1.default.find();
            if (!files)
                return;
            files.forEach((file) => __awaiter(void 0, void 0, void 0, function* () {
                let { _id, exp_timestamp, file_name } = file;
                if (exp_timestamp <= Date.now()) {
                    fs_1.default.unlink((0, GetPathToOperative_1.default)() + file_name, (err) => __awaiter(void 0, void 0, void 0, function* () {
                        if (err) {
                            console.log('error while deleting from operative');
                            console.log(err);
                        }
                        else {
                            try {
                                yield OperativeFile_1.default.deleteOne({ _id });
                                console.log('operative file deleted successfully');
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }));
                }
            }));
        }
        catch (e) {
            console.log(e);
        }
    }), TimePeriods_1.TEN_MINUTES);
};
exports.default = OperativeFilesChecker;
