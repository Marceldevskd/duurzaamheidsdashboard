import mongoose, { Schema, Document } from 'mongoose';

export interface CompaniesProps extends Document {
	name: string;
	companyID: string;
	companyHash: string;
}

const CompaniesSchema: Schema = new Schema({
	name: String,
	companyID: String,
	companyHash: String
});

const Companies = mongoose.model<CompaniesProps>('Companies', CompaniesSchema);

export default Companies;
