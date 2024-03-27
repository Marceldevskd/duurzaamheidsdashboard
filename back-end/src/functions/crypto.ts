import crypto from 'crypto';

export function createBase64String(size: number) {
	return crypto
		.randomBytes(size)
		.toString('base64')
		.slice(0, size);
}