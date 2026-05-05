import mysql from "mysql2";

let conexion=mysql.createConnection({
    host:"localhost",
    database: "nova_salud",
    user: "root",
    password: ""
});

conexion.connect(function (err) {
    if (err) {
        throw err;
    }else{
        console.log("conexion exitosa")
    }
})