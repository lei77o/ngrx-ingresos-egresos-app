export class Usuario {

    static fromFirebase( {email, uid, nombre }){
        return new Usuario( uid, nombre, email)
    }

    constructor(
        public nombre: string,
        public email: string,
        public descripcion: string,
        public uid?: string
        
    ){}

}
