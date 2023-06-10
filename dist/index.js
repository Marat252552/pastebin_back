"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const DBconnect_1 = __importDefault(require("./DataFlow/database/DBconnect"));
dotenv_1.default.config();
const start = () => {
    let PORT = process.env.PORT;
    try {
        (0, DBconnect_1.default)();
        app_1.default.listen(PORT, () => {
            console.log('server is running on port ' + PORT);
        });
    }
    catch (e) {
        console.log(e);
    }
};
start();
