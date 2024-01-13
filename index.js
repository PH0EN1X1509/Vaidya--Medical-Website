import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser  from "body-parser";
import { log } from "console";
import mysql from "mysql2";

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'users',
  password:'pranay'
});



const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.set('views', './views');
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");

});

app.use(express.static("public"));

app.get("/login.html", (req, res) => {
  
    res.sendFile(__dirname + "/public/login.html");
  });

app.use(bodyParser.urlencoded({extended: true}));

app.post("/submit",(req,res)=>{
  console.log(req.body);
})

app.post("/register.html",(req,res)=>{
  let usernamev=req.body.usernamev;
  let passwordv=req.body.passwordv;
  console.log(usernamev);
  console.log(passwordv);
  connection.query(
    `INSERT INTO user (usernamev,passwordv) VALUES ("${usernamev}","${passwordv}");`,
    function(err, results, fields) {
      console.log(results); // results contains rows returned by server
     // console.log(fields); // fields contains extra meta data about results, if available
      
    }
  );
  
  // res.redirect("/");
  res.render('index1.ejs', {usernamev });
})

app.post('/login.html', function (req, res) {
  let s_username = req.body.s_username;
  let s_password = req.body.s_password;

  // console.log(req.body);
  try {
      let q =` SELECT * FROM user WHERE usernamev = ? AND passwordv = ?`;
      connection.query(q, [s_username, s_password], (err, results) => {
          if (err) throw err;
          if (results.length > 0) {
            // res.send("Welcome "+s_username )
              // res.redirect('/continue');
              res.render('index.ejs', { s_username });
          } else {
              res.send("not success")
              // res.send('Incorrect Username and/or Password!');
              // res.render('incorrectpw.ejs', { username })
          }
          console.log(results);
      }
      );
  } catch (err) {
      console.log(err);
      res.send("ERROR in db")
  }
  // res.send(Welcome ${username}. pw is ${password});
})

app.post("/home",(req,res)=>{

let namev=req.body.namev;

let phone     =req.body.phone  ;
let  email   =req.body.email  ;  
let  country  =req.body.country  ;
let  state    =req.body.state  ;
let   city  =req.body.city  ;
let   ID   =req.body.ID  ;
let usernamev=req.body.usernamev;
let passwordv= req.body.passwordv;
// let   role  =req.body.role  ;
console.log("Phone -"+phone)
console.log("email- "+email)
console.log("country- "+country)
console.log("state- "+state)
console.log("city- "+city)
console.log("ID- "+ID)
console.log("username- "+usernamev)
console.log("password- "+passwordv)
// console.log(namev);
res.redirect("/");
});





app.listen(port, () => {
  console.log(`Listening on port `+ port);
});
