"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const GetFilesRouter_1 = __importDefault(require("./routes/FilesRouter/GetFilesRouter"));
const multer_1 = __importDefault(require("multer"));
const body_parser_1 = __importDefault(require("body-parser"));
const OperativeFileChecker_1 = __importDefault(require("./OperativeFileChecker"));
const GetPinsRouter_1 = __importDefault(require("./routes/PinRouter/GetPinsRouter"));
const path_1 = __importDefault(require("path"));
exports.upload = (0, multer_1.default)({ dest: 'uploads/' });
const jsonBodyMiddleware = express_1.default.json();
const app = (0, express_1.default)();
// app.use(fileUpload({}))
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
app.use(jsonBodyMiddleware);
const FilesRouter = (0, GetFilesRouter_1.default)();
const PinsRouter = (0, GetPinsRouter_1.default)();
app.use('/pins', PinsRouter);
app.use('/files', FilesRouter);
app.use(express_1.default.static(path_1.default.resolve(__dirname, 'static')));
(0, OperativeFileChecker_1.default)();
exports.default = app;
