import argon2 from 'argon2';

export async function createHash(password: string) {
	try {
		const hash = await argon2.hash(password);
		return hash;
	} catch (err) {
		console.error('Error creating hash:', err);
		return null;
	}
}