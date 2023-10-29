"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WEBHOOKS = exports.URL_SNIPER_SELF_TOKEN = exports.SNIPER_SELF_TOKEN = exports.SNIPER_GUILD_ID = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
exports.SNIPER_GUILD_ID = "1165993646282252308";
exports.SNIPER_SELF_TOKEN = "MTE2MDQzMTM0NDk0MjMyMTcyNQ.G6sXIw.LvC8BsAYyFeIvXOdHFV5VSOkRjfR6WjFdKEh7M";
exports.URL_SNIPER_SELF_TOKEN = "MTE2MDQzMTM0NDk0MjMyMTcyNQ.G6sXIw.LvC8BsAYyFeIvXOdHFV5VSOkRjfR6WjFdKEh7M";
exports.WEBHOOKS = {
    SUCCESS: async (content) => {
        await (0, node_fetch_1.default)(`https://discord.com/api/webhooks/1167755558489694248/-qPEthF4AB842lMN2Eu1kEKPDnyD2kzBnl5wjbXac4NkSKCxw8Tbf2f70X3OKm-uIrM2`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content,
                username: "SUCCESS",
            }),
        });
    },
    INFO: async (content) => {
        await (0, node_fetch_1.default)(`https://discord.com/api/webhooks/1167755558489694248/-qPEthF4AB842lMN2Eu1kEKPDnyD2kzBnl5wjbXac4NkSKCxw8Tbf2f70X3OKm-uIrM2`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content,
                username: "INFO",
            }),
        });
    },
    FAIL: async (content) => {
        await (0, node_fetch_1.default)(`https://discord.com/api/webhooks/1167755558489694248/-qPEthF4AB842lMN2Eu1kEKPDnyD2kzBnl5wjbXac4NkSKCxw8Tbf2f70X3OKm-uIrM2`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content,
                username: "FAIL",
            }),
        });
    },
};
