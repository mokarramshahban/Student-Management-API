const express = require("express");
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// User data with initial student information
const users = [{
    name: "John",
    students: [{
        passed: false
    }]
}];

// GET route to retrieve student information
app.get("/", function(req, res) {
    const johnStudents = users[0].students;
    const numberOfStudents = johnStudents.length;

    // Calculate the number of passed students
    let numberOfPassedStudents = 0;
    for (let i = 0; i < johnStudents.length; i++) {
        if (johnStudents[i].passed) {
            numberOfPassedStudents += 1;
        }
    }

    // Calculate the number of failed students
    const numberOfFailedStudents = numberOfStudents - numberOfPassedStudents;

    // Respond with student data
    res.json({
        numberOfStudents,
        numberOfPassedStudents,
        numberOfFailedStudents
    });
});

// POST route to add a new student
app.post("/", function(req, res) {
    // Check if passed is provided; default to false if not
    const hasPassed = req.body.passed !== undefined ? req.body.passed : false;

    // Add a new student with pass/fail status
    users[0].students.push({
        passed: hasPassed
    });

    // Respond with a confirmation message
    res.json({
        msg: "Student added!"
    });
});

// PUT route to update all students to passed
app.put("/", function(req, res) {
    // Set all students to passed
    for (let i = 0; i < users[0].students.length; i++) {
        users[0].students[i].passed = true;
    }

    // Respond with a confirmation message
    res.json({
        msg: "All students updated to passed!"
    });
});

// DELETE route to delete one failed student at a time
app.delete("/", function(req, res) {
    // Find and remove the first failed student
    for (let i = 0; i < users[0].students.length; i++) {
        if (!users[0].students[i].passed) {
            // Remove the failed student by splicing it out of the array
            users[0].students.splice(i, 1);
            return res.json({
                msg: "One failed student deleted successfully!"
            });
        }
    }

    // If no failed student is found
    res.status(411).json({
        msg: "No failed student found!"
    });
});

// Start the server
app.listen(3007, function() {
    console.log("Server running on port 3007");
});