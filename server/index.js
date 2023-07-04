const express = require('express')
const mysql = require('mysql2')
const app = express()
const bodyParser = require("body-parser");
const cors = require('cors')

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

// Setting up a route to handle the POST request
app.post('/posts', (req, res) => {
    const { title, subtitle, date, description } = req.body;

    const sqlInsert = 'INSERT INTO posts (title, subtitle, date, description) VALUES (?, ?, ?, ?)';
    db.query(sqlInsert, [title, subtitle, date, description], (err, result) => {
        if (err) {
            console.error('Error inserting data into the database: ', err);
            res.status(500).send('Error inserting data into the database');
            return;
        }
        console.log('Data inserted into the database!');
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
app.delete('/posts/:id', (req, res) => {
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
app.put('/posts/:id', (req, res) => {
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


app.listen(3001, ()=> {
    console.log("running on port 3001")
})
