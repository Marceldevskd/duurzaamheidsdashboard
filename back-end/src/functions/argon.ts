import argon2 from 'argon2';

export async function createHash(token: string) {
	try {
		const hash: string = await argon2.hash(token);
		return hash;
	} catch (err) {
		console.error('Error creating hash:', err);
		return null;
	}
}

export async function compareHash(token: string, hash: string) {
	try {
		const match: boolean = await argon2.verify(hash, token);
		return match;
	} catch (err) {
		console.error('Error comparing hash:', err);
		return false;
	}
}