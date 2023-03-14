import { logger } from '@lib/logger';
import { addTemplate, TemplateId } from './template-schema';
import { assertNewTemplate } from './template-validators'
import { registerTemplateEvent } from '@models/template'
import { v4 as uuidv4 } from 'uuid';


export async function registerTemplate(newTemplate: addTemplate): Promise<TemplateId> {
    try {
        assertNewTemplate(newTemplate)
        //TODO: push to OSS
        const templateId: string = uuidv4();
        //TODO : push a message to kafka
        registerTemplateEvent(templateId).then(() => { logger.info(`${templateId} : Register Template Event Push`) })
        return { templateId }
    } catch (error) {
        throw error
    }
}