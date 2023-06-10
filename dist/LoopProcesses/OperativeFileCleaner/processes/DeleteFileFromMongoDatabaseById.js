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
const OperativeFileModel_1 = __importDefault(require("../../../DataFlow/mongo_database/Models/OperativeFileModel"));
const DeleteFileFromMongoDatabaseById = (file_id) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield OperativeFileModel_1.default.deleteOne({ _id: file_id });
            console.log('SUCCESS - delete operative file from DB');
            resolve(null);
        }
        catch (e) {
            console.log('ERROR - delete operative file from DB');
            console.log(e);
            reject();
        }
    }));
};
exports.default = DeleteFileFromMongoDatabaseById;
