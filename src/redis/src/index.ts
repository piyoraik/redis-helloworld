import express, { Request } from "express";
import redis from "redis";
import axios from "axios";
import { User } from "./types/api/user";
import { ExRequest } from "./types/request";

const redisPort = 6379;
const expressPort = process.env.PORT || 3000;

const redisConfig = {
	host: "redis",
	port: redisPort,
};

const app = express();
const redisClient = redis.createClient(redisConfig);
const MOCK_API = "https://jsonplaceholder.typicode.com/users/";

const fetchData = async function (id: string, res: express.Response) {
	const userData = await axios
		.get<User>(`${MOCK_API}?id=${id}`)
		.then((response) => {
			return response.data;
		});
	return userData;
};

app.use("/users", async (req: ExRequest, res: express.Response) => {
	const id = req.query.id;

	try {
		const userData: User = await fetchData(id, res);
		res.status(200).send(userData);
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
});

app.use("/cached-users", (req: ExRequest, res: express.Response) => {
	const id = req.query.id;

	try {
		redisClient.get(id, async (err, data) => {
			if (err) {
				console.log(err);
				throw err;
			}

			if (data) {
				console.log("Redisからデータ取得");
				res.status(200).send(JSON.parse(data));
			} else {
				const userData: User = await fetchData(id, res);
				redisClient.setex(id, 600, JSON.stringify(userData));
				res.status(200).send(userData);
			}
		});
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
});

app.listen(expressPort, () => {
	console.log(`Server Start on Port ${expressPort}`);
});
