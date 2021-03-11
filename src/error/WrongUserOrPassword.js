import { ErrorManager } from "./ErrorManager";

export class WrongUserOrPassword extends ErrorManager {
  constructor() {
    super("Usuário ou senha incorretos!");
  }
}
