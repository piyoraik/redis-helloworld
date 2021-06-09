import { Request } from "express";

type queryKeys = "id" | "name";

export interface ExRequest extends Request {
	query: {
		[key in queryKeys]: string;
	};
}
