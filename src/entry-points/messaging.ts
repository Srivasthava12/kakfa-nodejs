import * as configurationProvider from '@lib/config-provider'
import { logger } from '@lib/logger';
import { kafkaWrapper } from '@lib/kafka'


export async function startMessaging() {
    try {
        const kafkaHost = configurationProvider.getValue('kafkaHost');
        if(kafkaHost) {
            await kafkaWrapper.connect()
            await kafkaWrapper.sendMessage("INIT", "INIT")
        }
        return kafkaHost
    } catch (error) {
        throw error
    }
}

