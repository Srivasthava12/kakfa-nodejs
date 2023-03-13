import { addTemplate, TemplateId } from './template-schema';
import { assertNewTemplate } from './template-validators'
import { v4 as uuidv4 } from 'uuid';


export async function registerTemplate(newTemplate: addTemplate): Promise<TemplateId> {
    try {
        assertNewTemplate(newTemplate)
        //TODO: push to OSS
        const uuid: string = uuidv4();
        //TODO : push a message to kafka
        return { templateId: uuid }
    } catch (error) {
        throw error
    }
}