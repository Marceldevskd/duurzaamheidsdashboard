import { Request, Response, NextFunction } from 'express';

const middleware = (req: Request, res: Response, next: NextFunction) => {
	// Middleware logic goes here
	// You can modify the request or response objects, or perform any other operations

	// Call next() to pass control to the next middleware function
	next();
};

export default middleware;