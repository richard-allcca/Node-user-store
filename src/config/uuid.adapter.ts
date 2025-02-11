import { v4 as uuidV4 } from "uuid";



export class Uuid {

  static generate = () => {
    return uuidV4();
  }
}