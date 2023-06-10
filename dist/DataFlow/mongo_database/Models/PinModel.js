"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Image = new mongoose_1.Schema({
    file_name: { type: String, required: true },
    key: { type: String, required: true },
    link: { type: String, required: true }
});
const Pin = new mongoose_1.Schema({
    text: { type: String, required: true, maxLength: 200 },
    title: { type: String, required: true, maxLength: 20 },
    images: [Image],
    one_read: { type: Boolean, default: false },
    createdAt: { type: Date, default: () => Date.now() },
    views: { type: Number, default: 0 },
    expiresAt: { type: Date, required: true }
});
// Find pins that 1. are not for one_read only and 2. they are already expired according to their days_alive and createdAt values
Pin.statics.findExpired = function () {
    let getCurrentDate = () => {
        return Date.now();
    };
    // 'expiresAt' date is lower than 'now' date
    return this.where('expiresAt').lt(getCurrentDate());
};
Pin.statics.addView = function (_id) {
    return this.updateOne({ _id }, { $inc: { 'views': 1 } });
};
// Find those pins that are created for one read only and already been watched at least 1 time
Pin.statics.findDisposed = function () {
    return this.where('one_read').equals(true).where('views').gt(0);
};
const PinModel = (0, mongoose_1.model)('pin', Pin);
exports.default = PinModel;
