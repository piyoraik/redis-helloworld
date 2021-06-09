import { Request } from "express";

type queryKeys = "id";

export interface ExRequest extends Request {
	query: {
		[key in queryKeys]: string;
	};
}
