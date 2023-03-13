import * as configurationProvider from '@lib/config-provider'
import { logger } from '@lib/logger';
import { kafkaWrapper } from '@lib/kafka'


export async function startMessaging() {
    try {
        const kafkaHost = configurationProvider.getValue('kafkaHost');
        if(kafkaHost) {
            await kafkaWrapper.connect()
        }
        return kafkaHost
    } catch (error) {
    }
}

