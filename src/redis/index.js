const redis = require("redis");
const express = require("express");
const axios = require("axios");

// redis, express ports
const redisPort = 6379;
const expressPort = 3000;

// redis config
const redisConfig = {
	host: "redis",
	port: redisPort,
};

// redis
const redisClient = redis.createClient(redisConfig);
// express
const app = express();
// mock api
const MOCK_API = "https://jsonplaceholder.typicode.com/users/";

app.get("/users", (req, res) => {
	const id = req.query.id;

	try {
		axios.get(`${MOCK_API}?id=${id}`).then((response) => {
			const users = response.data;
			console.log(users);
			res.status(200).send(users);
		});
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
});

app.get("/cached-users", (req, res) => {
	const id = req.query.id;

	try {
		redisClient.get(id, (err, data) => {
			if (err) {
				console.log(err);
				throw err;
			}

			if (data) {
				console.log("User successfully retrieved from Redis");
				res.status(200).send(JSON.parse(data));
			} else {
				axios.get(`${MOCK_API}?id=${id}`).then((response) => {
					const users = response.data;
					console.log(users);
					redisClient.setex(id, 600, JSON.stringify(users));

					console.log("Users successfully retrieved from the API");

					res.status(200).send(users);
				});
			}
		});
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
});

app.listen(expressPort, () => {
	console.log(`Server Start on Port ${expressPort}`);
});
