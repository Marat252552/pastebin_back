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
exports.UploadImage = void 0;
const path_1 = __importDefault(require("path"));
let EasyYandexS3 = require('easy-yandex-s3').default;
// Инициализация
let s3 = new EasyYandexS3({
    auth: {
        accessKeyId: process.env.YANDEX_ACCESS_KEY_ID,
        secretAccessKey: process.env.YANDEX_SECRET_ACCESS_KEY,
    },
    Bucket: process.env.YANDEX_BUCKET_NAME,
    debug: true, // Дебаг в консоли, потом можете удалить в релизе
});
let UploadImage = (image_name) => __awaiter(void 0, void 0, void 0, function* () {
    let upload = yield s3.Upload({
        path: path_1.default.resolve(__dirname, 'static', image_name),
        save_name: true
    }, '/test/');
    console.log(upload);
});
exports.UploadImage = UploadImage;
