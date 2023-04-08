const express = require("express");
const bodyParser = require("body-parser"); //data receive

const app = express();
app.use(express.static("public"));
const cors = require("cors");
const mongoose = require("mongoose"); //mongoDB -> better

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
const projectUrl =
  "mongodb+srv://rachita12:rachita12@cluster0.h4co6mv.mongodb.net/ProjectorBooking2?retryWrites=true&w=majority";

mongoose.set('strictQuery', false);

mongoose.connect(projectUrl,{
  useNewUrlParser:true,
  useUnifiedTopology:true
})

// structure of schema
const signUpSchema = new mongoose.Schema({
  Email: String,
  Password: String,
  cPassword:String,
  Emp_Id: String,
});

const loginSchema = new mongoose.Schema({
  Email: String,
  Password: String,
});

const signUp = mongoose.model("signUp", signUpSchema);
const login = mongoose.model("login", loginSchema);

// routing pages

app.set("view engine" , "ejs");

/*app.get("/", (req, res) => {
  res.sendFile(__dirname + "/page.html");
});*/

app.get("/", (req, res) => {
  res.render("page");
});
app.get("/book", (req, res) => {
  res.render("Book");
});
app.post("/",(req,res)=>{
  res.redirect("/book")
});
app.get("/book2", (req, res) => {
  res.render("Book2");
});
app.post("/",(req,res)=>{
  res.redirect("/book2")
});
app.get("/book3", (req, res) => {
  res.render("Book3");
});
app.post("/",(req,res)=>{
  res.redirect("/book3")
});

/*app.get("/#roadway", (req, res) => {
  res.sendFile(__dirname + "/Home.html#roadway");
});*/

// giving definition to the signUp schema

app.post("/signup", (req, res) => {
  const SignUp = new signUp({
    Email: req.body.email,
    Password:req.body.password,
    cPassword: req.body.cpassword,
    Emp_Id : req.body.emp_Id
  });

  console.log(req.body);

  //function which saves the data to the db
  SignUp.save(function (err) {    
    if (!err) {
      res.redirect("/");
    } else {
      console.log(err);
    }
  });
});

  app.post("/login  ", (req, res) => {
    const Login = new login({
      Email: req.body.email,
      Password:req.body.password,
    });

  console.log(req.body);

  Login.save(function (err) {
    if (!err) {
      res.redirect("/");
    } else {
      console.log(err);
    }
  });
});

  //Testing Purpose
  // console.log(req.body.user);*/

  const projectors = [
    { id: 1, available: true },
    { id: 2, available: true },
    { id: 3, available: true },
  ];
  
  app.post('/book-projector', (req, res) => {
    const { day, lecture, projectorId } = req.body;
    const projector = projectors.find(p => p.id === projectorId);
    if (!projector) {
      return res.status(400).json({ error: 'Invalid projector ID' });
    }
    const booking = bookings.find(b => b.day === day && b.lecture === lecture && b.projectorId === projectorId);
    if (booking) {
      return res.status(400).json({ error: 'Projector is already booked' });
    }
    projector.available = false;
    bookings.push({ day, lecture, projectorId });
    res.json({ message: 'Projector booked successfully' });
  });
  
  app.get('/check-availability', (req, res) => {
    const { day, lecture, projectorId } = req.query;
    const projector = projectors.find(p => p.id === Number(projectorId));
    if (!projector) {
      return res.status(400).json({ error: 'Invalid projector ID' });
    }
    const booking = bookings.find(b => b.day === day && b.lecture === lecture && b.projectorId === Number(projectorId));
    const isAvailable = projector.available && !booking;
    res.json({ isAvailable });
  });
  
  app.get('/available-projectors', (req, res) => {
    const { day, lecture } = req.query;
    const availableProjectors = projectors.filter(p => {
      const booking = bookings.find(b => b.day === day && b.lecture === lecture && b.projectorId === p.id);
      return p.available && !booking;
    });
    res.json({ availableProjectors });
  });
  

  

app.listen(3000, () => {
  console.log("Rachita's Server running on port 3000"); //3000 8000 5500
});
