export class BotClass {
    name = "";
    api = "";
    icon = "";
    action = [];
    subAction = [];
    fetchAction;
    displayAction;

    constructor(name, icon, api, action, subAction, fetchAction, displayAction) {
        this.name = name;
        this.icon = icon;
        this.api = api;
        this.action = action;
        this.subAction = subAction;
        this.fetchAction = fetchAction;
        this.displayAction = displayAction;
    }
}