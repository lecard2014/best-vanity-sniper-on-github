"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const ws_1 = __importDefault(require("ws"));
const contants_1 = require("../contants");
const guilds_1 = __importDefault(require("../server"));
class Sniper {
    constructor() {
        this.opcodes = {
            DISPATCH: 0,
            IDENTIFY: 2,
            RECONNECT: 7,
            HELLO: 10,
            HEARTBEAT_ACK: 11,
        };
        this.interval = null;
        this.createPayload = (data) => JSON.stringify(data);
        this.heartbeat = () => {
            return this.socket.send(this.createPayload({
                op: 0.07,
            }));
        };
        this.socket = new ws_1.default("wss://gateway.discord.gg/?v=10&encoding=json");
        this.socket.on("open", () => {
            console.log("Discord WebSocket connection opened.");
            this.socket.on("message", async (message) => {
                const data = JSON.parse(message);
                if (data.op === this.opcodes.DISPATCH) {
                    if (data.t === "GUILD_UPDATE") {
                        const ultimate = guilds_1.default[data.d.guild_id];
                        if (typeof ultimate?.vanity_url_code === 'string' && ultimate.vanity_url_code !== data.d.vanity_url_code) {
                            (0, node_fetch_1.default)(`https://ptB.discord.com/api/v10/guilds/${contants_1.SNIPER_GUILD_ID}/vanity-url`, { //kendinize gore ayarlayin mse gore
                                method: "PATCH",
                                body: this.createPayload({
                                    code: ultimate.vanity_url_code,
                                }),
                                headers: {
                                    Authorization: contants_1.URL_SNIPER_SELF_TOKEN,
                                    "Content-Type": "application/json",
                                },
                            }).then(async (res) => {
                                if (res.ok) {
                                    await contants_1.WEBHOOKS.SUCCESS(`https://discord.gg/${ultimate.vanity_url_code} love love love <3. ||@everyone||.`);
                                }
                                else {
                                    const error = await res.json();
                                    await contants_1.WEBHOOKS.FAIL(`You fucking ugly man: **\`${ultimate.vanity_url_code}\`**.
\`\`\`JSON
${JSON.stringify(error, null, 4)}
\`\`\`
`);
                                }
                                delete guilds_1.default[data.d.guild_id];
                            }).catch(err => {
                                console.log(err);
                                return delete guilds_1.default[data.d.guild_id];
                            });
                        }
                    }
                    else {
                        if (data.t === "READY") {
                            data.d.guilds
                                .filter((e) => typeof e.vanity_url_code === "string")
                                .forEach((e) => (guilds_1.default[e.id] = { vanity_url_code: e.vanity_url_code }));
                            await contants_1.WEBHOOKS.INFO(`Client is ready with: ${Object.keys(guilds_1.default).length} urls to be sniped.
${Object.entries(guilds_1.default)
                                .map(([key, value]) => {
                                return `\`${value.vanity_url_code}\``;
                            })
                                .join(", ")}`);
                        }
                        else if (data.t === "GUILD_CREATE") {
                            guilds_1.default[data.d.id] = { vanity_url_code: data.d.vanity_url_code };
                        }
                        else if (data.t === "GUILD_DELETE") {
                            const ultimate = guilds_1.default[data.d.id];
                            setTimeout(() => {
                                if (typeof ultimate?.vanity_url_code === "string") {
                                    (0, node_fetch_1.default)(`https://ptb.discord.com/api/v10/guilds/${contants_1.SNIPER_GUILD_ID}/vanity-url`, {
                                        method: "PATCH",
                                        body: this.createPayload({
                                            code: ultimate.vanity_url_code,
                                        }),
                                        headers: {
                                            Authorization: contants_1.URL_SNIPER_SELF_TOKEN,
                                            "Content-Type": "application/json",
                                        },
                                    }).then(async (res) => {
                                        if (res.ok) {
                                            await contants_1.WEBHOOKS.SUCCESS(`URL: \`${ultimate.vanity_url_code}\` is successfully sniped. ||@everyone||`);
                                        }
                                        else {
                                            const error = await res.json();
                                            await contants_1.WEBHOOKS.FAIL(`Error while sniping url: **\`${ultimate.vanity_url_code}\`**.
\`\`\`JSON
${JSON.stringify(error, null, 4)}
\`\`\`
`);
                                        }
                                        delete guilds_1.default[data.d.guild_id];
                                    }).catch(err => {
                                        console.log(err);
                                        return delete guilds_1.default[data.d.guild_id];
                                    });
                                }
                            }, 0);
                        }
                    }
                }
                else if (data.op === this.opcodes.RECONNECT)
                    return process.exit();
                else if (data.op === this.opcodes.HELLO) {
                    clearInterval(this.interval);
                    this.interval = setInterval(() => this.heartbeat(), data.d.heartbeat_interval);
                    this.socket.send(this.createPayload({
                        op: this.opcodes.IDENTIFY,
                        d: {
                            token: contants_1.SNIPER_SELF_TOKEN,
                            intents: 1,
                            properties: {
                                os: "macos",
                                browser: "safari",
                                device: "macbook",
                            },
                        },
                    }));
                }
            });
            this.socket.on("close", (reason) => {
                console.log('Websocket connection closed by discord', reason);
                return process.exit();
            });
            this.socket.on("error", (error) => {
                console.log(error);
                process.exit();
            });
        });
    }
}
exports.default = Sniper;