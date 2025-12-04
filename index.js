const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'public')))
//setting up the ejs
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    fs.readdir(`./files`, (err, files) => {
        // console.log(files)
        res.render('index', { files: files })
    })
})


//fs.writeFile(`path where i have to store , what type of data i have to store , callback function(err)`)
app.post("/create", (req, res) => {
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.desc, (err) => {
        res.redirect('/')
    })
})


//creating the routes fot redirecting the particular task
// utf-8 = reading the fileLoader in english
app.get('/files/:filename', (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, fileData) => {
        // console.log(fileData)
        res.render('show', { filename: req.params.filename, filedata: fileData })
    })
})


//editing route
app.get('/edit/:filename', (req, res) => {
    res.render("edit", { filename: req.params.filename })
})

app.post('/edit', (req, res) => {
    fs.rename(`./files/${req.body.prev_name}`, `./files/${req.body.new_name.split(' ').join('')}.txt`, (err) => {
        res.redirect("/")
    })
})


app.listen(port, () => {
    console.log("server is running")
})