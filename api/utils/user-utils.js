import bcrypt from "bcrypt";

/**
 * Recibe un string y lo devuelve hasheado
 * @param {string} password 
 * @returns {string}
 */
export const createHash = (password) =>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}
/**
 * Recibe la password en texto plano y la password hasheada almacenada en el servidor y las compara. Esto devuelve un booleano.
 * @param {string} passwordPlain 
 * @param {string} passwordHash 
 * @returns {boolean}
 */
export const isValidPassword =(passwordPlain, passwordHash)=>{    
    return bcrypt.compareSync(passwordPlain,passwordHash);
}
