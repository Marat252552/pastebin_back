"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Pin = new mongoose_1.Schema({
    text: { type: String, required: true, length: 200 },
    title: { type: String, required: true, length: 20 },
    images_names: [{ type: String }]
});
const PinModel = (0, mongoose_1.model)('pin', Pin);
exports.default = PinModel;
