import { kafkaWrapper } from '@lib/kafka';
import { logger } from '@lib/logger';
import { RecordMetadata } from 'kafkajs';

const REGISTER_TEMPLATE_TOPIC = "REGISTER_TEMPLATE"
export const registerTemplateEvent = async (id:string) : Promise<RecordMetadata[]> => {
    try {
        return await kafkaWrapper.sendMessage(REGISTER_TEMPLATE_TOPIC, id)
    } catch (error) {
        throw error
    }
}