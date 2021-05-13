// import emitter from "../services/emitter";

export class ErrorManager extends Error {
  constructor(message: string) {
    super(message);

    this.show();
  }

  show() {
    // try {
    //   console.log("ERROR", this.message);
    //   emitter.emit("showToast", { message: this.message });
    // } catch (err) {
    //   console.log("Error showing Toast", err);
    // }
  }
}
