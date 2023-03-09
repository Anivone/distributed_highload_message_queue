import * as dotenv from "dotenv";
import * as path from "path";
import { initializeRabbitMq, jokesQueue, voicesQueue } from "./rabbitmq/config";
import { generateJoke } from "./api/generateJoke";

dotenv.config({
  path: path.join(process.cwd(), "..", ".env"),
});

initializeRabbitMq().then(async (channel) => {
  console.log("JokeService RabbitMQ connection was established");

  await channel.consume(jokesQueue, async (msg) => {
    if (msg !== null) {
      const joke = await generateJoke();
      console.log(joke);

      channel.sendToQueue(voicesQueue, Buffer.from(joke.text));
      console.log('Joke text has been sent to VoiceService');

      channel.ack(msg);
    }
  });
});
