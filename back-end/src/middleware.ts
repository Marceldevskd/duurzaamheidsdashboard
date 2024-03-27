import { Request, Response, NextFunction } from 'express';
import Companies from './models/companyModel';
import { compareHash } from './functions/argon';
declare module 'express-serve-static-core' {
	interface Request {
		companyID?: string;
	}
}

const middleware = async (req: Request, res: Response, next: NextFunction) => {
	// Get the authorization header from the request
	const authorizationHeader: string | undefined = req.headers.authorization;

	// Perform checks on the authorization header
	if (!authorizationHeader) {
		return res.status(401).json({ error: 'Authorization header missing' });
	}

	if (authorizationHeader.length !== 64) {
		return res.status(401).json({ error: 'Authorization header invalid' });
	}

	const company = await Companies.findOne({ companyID: authorizationHeader.slice(0, 8) });
	// Check if the company exists
	if (!company) {
		return res.status(401).json({ error: 'Authorization header invalid' });
	}
	console.log(authorizationHeader, company.companyHash);
	// Check if the hash is correct
	if (!await compareHash(company.companyToken, company.companyHash)) {
		return res.status(401).json({ error: 'Authorization header invalid' });
	}

	// Attach companyID to the request object
	req.companyID = company.companyID;

	console.log('Company ID:', req.companyID);
	// Call next() to pass control to the next middleware function
	next();
};

export default middleware;