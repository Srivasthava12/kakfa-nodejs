import { logger } from '@lib/logger';
import { addTemplate, TemplateId } from './template-schema';
import { assertNewTemplate } from './template-validators'
import { registerTemplateEvent } from '@models/template'
import { v4 as uuidv4 } from 'uuid';
import { push2Storage } from '@services/strorage-service';


export async function registerTemplate(newTemplate: addTemplate): Promise<TemplateId> {
    try {
        assertNewTemplate(newTemplate)
        const { fileB64 } = newTemplate
        const templateId: string = uuidv4();
        const storageServicePayload = { templateId, fileB64 }
        await push2Storage(storageServicePayload)
        registerTemplateEvent(templateId).then(() => { logger.info(`${templateId} : Register Template Event Push`) })
        return { templateId }
    } catch (error) {
        throw error
    }
}