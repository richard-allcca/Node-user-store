import { compareSync, genSaltSync, hashSync } from "bcryptjs";


export const bcryptAdapter = {

  // Encripta la contraseña ingresada por el usuario.
  hash: (password: string) => {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
  },

  // Compara la contraseña ingresada por el usuario con la contraseña almacenada en la base de datos.
  compare: (password: string, hash: string) => {
    return compareSync(password, hash);
  }

}