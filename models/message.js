export class MessageClass {
    content = "";
    author = "";
    time = "";
    status = "";

    constructor(content, author, time = new Date().toLocaleTimeString(), status = "sent") {
        this.content = content;
        this.author = author;
        this.time = time;
        this.status = status;
    }
}