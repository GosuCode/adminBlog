const express = require('express')
const mysql = require('mysql2')
const app = express()
const bodyParser = require("body-parser");
const cors = require('cors')
const path = require('path')

// Creating a MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "bloggingapp",
    password: "Other#001",
    port: 3306,
})

app.use(cors())
app.use(bodyParser.json());
app.use(express.json())
app.use(express.static('./Images'))


//Images
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage : storage });

//Handle post request
app.post('/posts',upload.single('image'),  (req, res) => {
    const { title, subtitle, date, description, categories } = req.body;
    const image = req.file.filename;

    const sqlInsert = 'INSERT INTO posts (title, subtitle, date, description, categories, image) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sqlInsert, [title, subtitle, date, description, categories, image], (err, result) => {
        if (err) {
            console.error('Error inserting data into the database: ', err);
            res.status(500).send('Error inserting data into the database');
            return;
        }
        console.log(req.file, 'Data inserted into the database!');
        res.status(200).send('Data inserted into the database');
    });
});

// Handle get request
app.get("/view", (req, res) =>{
    const sqlSelect = "SELECT * FROM posts"
    db.query(sqlSelect, (err, data) =>{
        if (err) {
            console.error(err);
            res.status(500).send("Error viewing data from the database");
            return;
        }
       res.json(data)
    })
})

// Get post by id
app.get("/postById/:id", (req, res) => {
  const { id } = req.params;
  const sqlQuery = "SELECT * FROM posts WHERE id = ?";

  db.query(sqlQuery, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error retrieving post by ID' });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    return res.json(result[0]);
  });
});

//Delete post
app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const sqlQuery = 'DELETE FROM posts WHERE id = ?';

  db.query(sqlQuery, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error deleting post' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    return res.json({ message: 'Post deleted successfully' });
  });
});

//Update post
app.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { title, subtitle, date, description } = req.body;

  const sqlQuery = 'UPDATE posts SET title = ?, subtitle = ?, date = ?, description = ? WHERE id = ?';

  db.query(sqlQuery, [title, subtitle, date, description, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error updating post' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    return res.json({ message: 'Post updated successfully' });
  });
});


const jwt = require('jsonwebtoken');
//login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sqlQuery = 'SELECT * FROM users WHERE email = ? AND password = ?';

  db.query(sqlQuery, [email, password], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error logging in' });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    const id = result[0].id;
    const token = jwt.sign({ id }, 'secret', { expiresIn: '1h' });
    return res.json({ Login: true, message: 'User logged in successfully', token });
  });
})


//register
app.post('/register', (req, res) => {
  const { email, password } = req.body;
  const sqlQuery = 'INSERT INTO users (email, password) VALUES (?, ?)';

  db.query(sqlQuery, [email, password], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error registering user' });
    }

    return res.json({ message: 'User registered successfully' });
  });
})




// const postRouter = require('./routes/posts')
// app.use("/api/posts", postRouter )

app.listen(3001, () => {
    console.log("Server running on port 3001");
})
