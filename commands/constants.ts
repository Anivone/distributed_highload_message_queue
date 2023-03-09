import * as queues from "../queues.json";

export const RABBITMQ_CONNECTION_URL = 'amqp://localhost';

export const jokesQueue = queues.jokeService;
export const voicesQueue = queues.voiceService;