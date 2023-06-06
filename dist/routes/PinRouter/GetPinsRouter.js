"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Controller_1 = __importDefault(require("./Controller"));
const GetPinsRouter = () => {
    const router = (0, express_1.Router)();
    router.post('/', Controller_1.default.createPin);
    router.get('/:_id', Controller_1.default.getPin);
    return router;
};
exports.default = GetPinsRouter;
