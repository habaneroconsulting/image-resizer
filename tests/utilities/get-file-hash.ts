import crypto from 'crypto';
import fs from 'fs';

export function getFileHash(path: string) {
	const fileBuffer = fs.readFileSync(path);
	const hashSum = crypto.createHash('sha256');
	hashSum.update(fileBuffer);

	const hex = hashSum.digest('hex');

	return hex;
}
