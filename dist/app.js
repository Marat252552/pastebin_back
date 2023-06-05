"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cors_1 = __importDefault(require("cors"));
const GetFilesRouter_1 = __importDefault(require("./routes/FilesRouter/GetFilesRouter"));
const app = (0, express_1.default)();
app.use((0, express_fileupload_1.default)({}));
app.use((0, cors_1.default)());
const FilesRouter = (0, GetFilesRouter_1.default)();
app.use('/files', FilesRouter);
exports.default = app;
