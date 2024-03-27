import express, {Request, Response} from 'express';
import Companies from '../models/companyModel';
import { AddCompanyProps } from '../models/postModels';
import { createBase64String } from '../functions/crypto';
import { createHash } from '../functions/argon';

const app = express.Router();

app.post('/', async (req: Request, res: Response) => {
	try {
		const AddCompanyData = req.body as AddCompanyProps;

		// Validate the received data
		if (!AddCompanyData.companyName || typeof AddCompanyData.companyName !== 'string') {
			return res.status(400).json({ error: 'Invalid data received' });
		}

		// Check if the company already exists
		if (await Companies.findOne({ name: AddCompanyData.companyName })) {
			return res.status(400).json({ error: 'Company already exists' });
		}

		let companyID: string;
		let companyToken: string;

		// CompanyID has to be unique so I will create a loop to check if the companyID already exists
		while (true) {
			// Create a base64 string for the company
			companyToken = createBase64String(64);

			// Make companyID from the Token
			companyID = companyToken.slice(0, 8);

			if (!await Companies.findOne({ companyID: companyID })) {
				break;
			}
		}

		// Create hash for the company
		const companyHash: string | null = await createHash(AddCompanyData.companyName);

		if (!companyHash) {
			throw new Error('Error creating hash');
		}

		// Add company to the database
		await Companies.create({
			companyID: companyID,
			name: AddCompanyData.companyName,
			hash: companyHash,
		});

		// When the company is added successfully, send a response with the token, companyID and companyName
		const response = {
			companyName: AddCompanyData.companyName,
			companyID: companyID,
			companyToken: companyToken,	
		};

		res.status(200).json(response);
		res.status(200).send('Company added successfully');
	} catch (err) {
		console.error('Error adding data:', err);
		res.status(500).send('Internal server error');
	}
});

export default app;