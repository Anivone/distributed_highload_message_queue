import { connect } from "amqplib";
import * as queues from "../../../queues.json";

const RABBITMQ_CONNECTION_URL = "amqp://localhost";

export const jokesQueue: string = queues.jokeService;
export const voicesQueue: string = queues.voiceService;

export const initializeRabbitMq = async () => {
  const connection = await connect(RABBITMQ_CONNECTION_URL);
  const channel = await connection.createChannel();

  await channel.assertQueue(jokesQueue);
  await channel.assertQueue(voicesQueue);

  return channel;
}