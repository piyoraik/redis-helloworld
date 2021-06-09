const redis = require("redis");

// redisへのコネクション
const client = redis.createClient(6379, "redis");

client.on("connect", function () {
	console.log("Redisへ接続");
});

client.on("error", function (e) {
	console.log(`エラー：${e}`);
});
