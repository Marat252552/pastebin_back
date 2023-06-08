"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Image = new mongoose_1.Schema({
    file_name: { type: String, required: true },
    key: { type: String, required: true },
    link: { type: String, required: true }
});
const ImageModel = (0, mongoose_1.model)('image', Image);
exports.default = ImageModel;
