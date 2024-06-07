export class BotClass {
    name = "";
    api = "";
    icon = "";
    action = [];
    subAction = [];

    constructor(name, icon, api, action, subAction) {
        this.name = name;
        this.icon = icon;
        this.api = api;
        this.action = action;
        this.subAction = subAction;
    }
}