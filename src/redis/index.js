const redis = require("redis");
const express = require("express");
const port = 3000;

// redis
const client = redis.createClient(6379, "redis");
// express
const app = express();

client.on("connect", function () {
	console.log("Redisへ接続");
});

client.on("error", function (e) {
	console.log(`エラー：${e}`);
});

app.get("/", (req, res) => {
	res.send("Hello World");
});

app.listen(port, () => {
	console.log(`Start on port ${port}`);
});
