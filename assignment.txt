Desarrollar un Servicio WEB que contenga las siguientes operaciones:
 CRUD de usuarios
    o Datos Mínimos:
         Nombres (String – Longitud 50)
         Apellidos (String – Longitud 50)
         Fecha de Nacimiento (Date)
         email (String – Longitud 50)
         Numero de Documento (Number – Longitud 7)
         Área (Number - Longitud 2)
         Salario (Decimal – Longitud 10 con 2 decimales)
         Estado (Activo/Inactivo – Activo por defecto)

 CRUD de Áreas
    o Datos Mínimos
         Código (Number - Longitud 2)
         Nombre (String – Longitud 50)
         Líder (Number – Longitud 7)
         Estado (Activo/Inactivo – Activo por defecto)

 Consulta de Áreas
    o Servicio de consulta de áreas.

 Consulta de Usuarios
    o Servicio de consulta de Usuarios, paginado y que sea dinámico la cantidad de
    registros devueltos.

 Reporte en Excel de usuarios por Área
    o Servicio de export en xlsx del total de usuarios con su respectiva área de
    trabajo.
    o Bonus si utiliza algún servicio en la nube para guardar los archivos y devolver
    la url.

 Deploy
    o Bono si todo se puede correr localmente desde docker con
    docker-compose.

Condiciones
     Cada operación debe tener una única URL.
     El servicio debe estar protegido con un API key para que solo un código valido pueda
    acceder a los recursos.
     Se deben validar todos los campos de ingreso de datos.
     Se deben controlar los posibles errores de la aplicación.
     El Servicio WEB debe ser de tipo REST.
     El desarrollo debe ser bajo NodeJS y una base de datos relacional (Oracle ó MySQL).
     El formato de intercambio de información debe ser JSON.

CREATE TABLE `express_ludycom`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NULL,
  `lastname` VARCHAR(50) NULL,
  `birthday` DATE NULL,
  `userId` INT(7) NULL,
  `areaId` INT(2) NULL,
  `salary` DECIMAL(10) NULL,
  `state` VARCHAR(10) NULL DEFAULT 'Active',
  `email` VARCHAR(50) NULL,
  UNIQUE INDEX `idUsers_UNIQUE` (`id` ASC),
  UNIQUE INDEX `userId_UNIQUE` (`userId` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC));


user = {
        "name": "Luis", 
        "lastname": "Rosales", 
        "birthday": "12/11702", 
        "email": "lrosales@gmail.com", 
        "userId": "15233694", 
        "areaId": "05", 
        "salary": "500000.00", 
        "state": "active,
        "password": "515151561616"
}

//consultas

{
        "name": "Luis", 
        "lastname": "Rosales", 
        "birthday": "1985/11/01", 
        "email": "admin@ludycom.com", 
        "userid": "25298418", 
        "areacode": "05", 
        "salary": "1500000.00", 
        "state": "active",
        "password": "adminadmin"
}


{
  "page": 2
}

{
        "name": "Maria", 
        "lastname": "Cabrales", 
        "birthday": "2001/16/01", 
        "email": "m.cabrales@ludycom.com", 
        "userid": "25298018", 
        "areacode": "03", 
        "salary": "200000.00", 
        "state": "active",
        "password": "12563254"
}

{
  "userid": 31,
  "name": "Luis",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMxLCJuYW1lIjoiTHVpcyIsImlhdCI6MTY4MTQyMjg4NiwiZXhwIjoxNjgxNDI2NDg2fQ.6Sxm77kk1-mSjJfCOKVzDfcFewx0CmaCzzrnTREt_8E"
}


{
        "code": "05", 
        "name": "Administration", 
        "lider": "Helena Vargas", 
        "state": "active"
}