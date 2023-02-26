import { Kafka, Producer, Consumer, ConsumerRunConfig } from 'kafkajs';
import * as configurationProvider from '@lib/config-provider'

class KafkaWrapper {
  private kafka: Kafka;
  private producer: Producer;
  private consumer: Consumer;

  constructor() {
    this.kafka = new Kafka({ brokers:["kafka:9092" ], clientId: 'my-app' });
    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: 'test-group' });
  }

  public async connect(): Promise<void> {
    await this.producer.connect();
    await this.consumer.connect();
  }

  public async sendMessage(topic: string, message: string): Promise<void> {
    await this.producer.send({
      topic: topic,
      messages: [{ value: message }],
    });
  }

  public async consumeMessage(
    topic: string,
    consumerRunConfig?: ConsumerRunConfig,
  ): Promise<void> {
    await this.consumer.subscribe({ topic });
    await this.consumer.run({
      ...consumerRunConfig,
      eachMessage: async ({ message }) => {
        console.log({
            value: message,
          })
      },
    });
  }

  public async disconnect(): Promise<void> {
    await this.producer.disconnect();
    await this.consumer.disconnect();
  }
}


export const kafkaWrapper =  new KafkaWrapper()
