import emitter from "../services/emitter";

export class Message {
  constructor(message) {
    this.message = message;
    this.showMessage();
  }

  showMessage() {
    try {
      console.log("MESSAGE", this.message);
      emitter.emit("showToast", { message: this.message });
    } catch (err) {
      console.log("Error showing Toast", err);
    }
  }
}
