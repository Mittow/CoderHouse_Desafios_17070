/* ===============================================DESAFIO-1====================================================== */
// ALUMNO: Bianco Salinas, Gian Franco

class Usuario{
    
    constructor(nombres, apellidos, libros, mascotas){
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName(){
        return console.log(`El nombre del usuario es :\t${this.nombres}, ${this.apellidos}`);
    }

    addMascota(mascota){
        this.mascotas.push(mascota);
    }

    countMascotas(){
        return console.log("Cantidad de mascotas: ", this.mascotas.length);
    }
    
    getMascota(){
        return console.log("Mascotas: ", this.mascotas);
    }

    addBooks(nombre, autor){
        this.libros.push({nombre, autor});
    }

    getDetailBooks(){
        return console.log("Detalle de Libros: ", this.libros);
    }

    getBookNames(){
        const result = this.libros.map(libro => {
            return libro.nombre;
        });

        return console.log("Nombres de libros: ", result);
    }
    
    countLibros(){
        return console.log("Cantidad de libros: ", this.libros.length);
    }

}

//Data
const dataLibros = 
[
    {
        nombre: "Los Heraldos Negros",
        autor: "Cesar Vallejo"
    },
    {
        nombre: "Tradiciones Peruanas",
        autor: "Ricardo Palma"
    }
];

const Mascotas = ["Perro", "Gato", "Mono"];

//Objeto usuario
const usuario = new Usuario("Gian Franco", "Bianco Salinas", dataLibros, Mascotas);

//Nombre completo de usuario
console.log("===================================================================");
usuario.getFullName();

//Libros
console.log("===================================================================");
usuario.addBooks("La Serpiente de oro", "Ciro Alegria");
usuario.addBooks("La Ciudad y los Perros", "Mario Vargas LLosa");
usuario.getDetailBooks();
usuario.getBookNames();
usuario.countLibros();

//Mascotas
console.log("===================================================================");
usuario.addMascota("Loro");
usuario.addMascota("Tortuga");
usuario.addMascota("Conejo");
usuario.getMascota();
usuario.countMascotas();
