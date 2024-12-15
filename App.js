// Import the required modules
var express = require("express");
var fs = require("fs");
var bodyParser = require("body-parser");

// Initialize the Express application
var app = express();

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Define a route for the home page
app.get('/', function(req, res) {
    res.send("Hello, it is my first Express application");
});

// Route for the about page
app.get('/about', function(req, res) {
    res.send("This is a basic Express application");
});

// Route with URL parameters
app.get('/users/:userId/books/:bookId', function(req, res) {
    res.send(req.params);
});

// Route to Get all Students
app.get('/GetStudents', function(req, res) {
    fs.readFile(__dirname + "/Student.json", 'utf8', function(err, data) {
        if (err) {
            return res.status(500).send("Error reading file");
        }
        res.json({
            status: true,
            Status_Code: 200,
            studentdata: JSON.parse(data)
        });
    });
});

// Route to Get a Student by ID
app.get('/GetStudentid/:id', function(req, res) {
    fs.readFile(__dirname + "/Student.json", 'utf8', function(err, data) {
        if (err) {
            return res.status(500).send("Error reading file");
        }
        var students = JSON.parse(data);
        var student = students["Student" + req.params.id];
        if (student) {
            res.json(student);
        } else {
            res.json({
                status: false,
                message: 'Student not found'
            });
        }
    });
});

// Serve the HTML form for student enrollment
app.get('/studentinfo', function(req, res) {
    res.sendFile(__dirname + '/StudentInfo.html');
});

// Handle the form submission
app.post('/submit-data', function(req, res) {
    var name = req.body.firstName + ' ' + req.body.lastName;
    var age = req.body.myAge;
    var gender = req.body.gender;
    var qualifications = 'Qualifications: ' + req.body.Qual.join(', ');

    res.send({
        status: true,
        message: 'Form Details',
        data: {
            name: name,
            age: age,
            gender: gender,
            qualifications: qualifications
        }
    });
});

// Start the server
app.listen(3000, function () {
    console.log("Server is running on port 3000");
});
