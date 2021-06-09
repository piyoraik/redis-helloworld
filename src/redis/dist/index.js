import express from "express";
import redis from "redis";
import axios from "axios";
var redisPort = 7379;
var expressPort = process.env.PORT || 3000;
var redisConfig = {
    host: "redis",
    port: redisPort,
};
var app = express();
var redisClient = redis.createClient(redisConfig);
var MOCK_API = "https://jsonplaceholder.typicode.com/users/";
app.use("/users", function (req, res) {
    var id = req.query.id;
    try {
        axios.get(MOCK_API + "?id=" + id).then(function (response) {
            var users = response.data;
            console.log(users);
            res.status(200).send(users);
        });
    }
    catch (err) {
        res.status(500).send({ error: err.message });
    }
});
app.listen(expressPort, function () {
    console.log("Server Start on Port " + expressPort);
});
