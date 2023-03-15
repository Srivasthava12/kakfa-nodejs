import fs from 'fs/promises';
import path from 'path';
import { storeTemplate } from './storage-schema';
import { assertTemplate2Store } from './storage-validators';

export const push2Storage = async (template: storeTemplate) => {
    try {
        assertTemplate2Store(template)
        const { fileB64, templateId } = template
        const fileBuffer = Buffer.from(fileB64, 'base64');
        const filePath = path.join(__dirname, '..', '..', '..', 'file-store', `${templateId}.docx`);
        return await fs.writeFile(filePath, fileBuffer);
    } catch (error) {
        throw error
    }
}