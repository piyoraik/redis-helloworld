const redis = require("redis");
const express = require("express");
const expressPort = 3000;
const redisPort = 6379;

// redis config
const redisConfig = {
	host: "redis",
	port: redisPort,
};

// redis
const client = redis.createClient(redisConfig);
// express
const app = express();

client.on("connect", function () {
	console.log("Redisへ接続");
});

app.get("/", (req, res) => {
	client.set("sato", "value");
	res.send("Hello World");
});

app.get("/sato", (req, res) => {
	const sato = client.get("sato", function (err, value) {
		res.send(value);
	});
});

app.listen(expressPort, () => {
	console.log(`Start on port ${expressPort}`);
});
