import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
const app = express();

//Cresting connection with the database.

const db = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"shashikala123*#",
    database:"test"
})

app.use(express.json());
app.use(cors())

app.get("/",(req,res)=>{
    res.json("")
})

app.get("/books",(req,res)=>{
    const q = "SELECT * FROM books"
    db.query(q,(err,data)=>{
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    })
})

// Directly providing values 
// app.post("/books",(req,res)=>{
//     const q = "INSERT INTO books (`title`,`desc`,`cover`) VALUES (?)"
//     const values = ["title from backend", "des from backend", "cover pic from backend"] 
//     db.query(q,[values],(err,data)=>{
//         if (err) {
//             return res.json(err);
//         }
//         return res.json("Book has been created!");
//     });
// } )

//Taking inputs from the users.
app.post("/books",(req,res)=>{
    const q = "INSERT INTO books (`title`,`desc`,`price`,`cover`) VALUES (?)"
    const values = [req.body.title,req.body.desc,req.body.price,req.body.cover,] 
    db.query(q,[values],(err,data)=>{
        if (err) {
            return res.json(err);
        }
        return res.json("Book has been created!");
    });
} );

app.delete("/books/:id", (req,res)=>{
   const bookId = req.params.id;
   const q = "DELETE FROM books WHERE id = ?"

   db.query(q,[bookId], (err,data)=>{
     if (err) {
        return res.json(err);
     }
    return res.json("Book has been deleted successfully.");
    })
});

app.put("/books/:id", (req,res)=>{
    const bookId = req.params.id;
    const q = "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id =?"
    const values = [req.body.title,req.body.desc,req.body.price,req.body.cover,] 
    
    db.query(q,[...values,bookId], (err,data)=>{
      if (err) {
         return res.json(err);
      }
     return res.json("Book has been updated successfully successfully.");
     })
 });

app.listen(8000, ()=>{

     console.log("Connected to backend")
});