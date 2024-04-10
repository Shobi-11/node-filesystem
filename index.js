const express = require ('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON in the request body
app.use(express.json());

app.get('/', (req, res) => {
    try {
        let dateTime = new Date().toISOString();
        fs.writeFile(`dateTime.txt`, dateTime, (err) => {
            if (err)
                throw err;
            else {
                fs.readFile(`dateTime.txt`, (err, data) => {
                    if (err)
                        throw err;
                    else
                        res.status(200).send({ message: "File Write Success", dateTime });
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

// POST endpoint to create a file with data from the request body
app.post('/create-file', (req, res) => {
    try {
        const { content } = req.body;
        if (!content) {
            return res.status(400).send({ message: "Content is required in the request body" });
        }

        let dateTime = new Date().toISOString();
        const fileName = `dateTime_post.txt`;

        fs.writeFile(fileName, content, (err) => {
            if (err) {
                throw err;
            } else {
                res.status(200).send({ message: "File Write Success", fileName, dateTime });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

app.listen(PORT, () => console.log(`App Listening on Port ${PORT}`));