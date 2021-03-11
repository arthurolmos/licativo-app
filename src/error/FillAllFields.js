import { ErrorManager } from "../error/ErrorManager";

export class FillAllFields extends ErrorManager {
  constructor() {
    super("Preencha os campos corretamente!");
  }
}
