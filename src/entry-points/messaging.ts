import * as configurationProvider from '@lib/config-provider'
import { logger } from '@lib/logger';
import { kafkaWrapper } from '@lib/kafka'


export async function startMessaging() {
    try {
        const kafkaHost = configurationProvider.getValue('kafkaHost');
        console.log('kafkaHost :>> ', kafkaHost);
        if(kafkaHost) {
            await kafkaWrapper.connect()
            await kafkaWrapper.consumeMessage("test", {})
            await kafkaWrapper.sendMessage("test", "DRAGON BALL Z")
        }
        return kafkaHost
    } catch (error) {
        console.log('error :>> ', error);
    }

}

