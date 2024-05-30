export class MessageClass {
    content = "";
    author = "";
    time = "";
    status = "";

    constructor(content, author, time = new Date().toLocaleTimeString(), status = "send") {
        this.content = content;
        this.author = author;
        this.time = time;
        this.status = status;
    }

    setStatus(status) {
        this.status = status;
    }
}