import path from "path";
import * as dotenv from 'dotenv';
import fs from "fs";
import { initializeRabbitMq, voicesQueue } from "./rabbitmq/config";
import { generateVoice } from "./api/generateVoice";

dotenv.config({
  path: path.join(process.cwd(), "..", ".env"),
});

initializeRabbitMq().then(async (channel) => {
  console.log("VoiceService RabbitMQ connection was established");

  await channel.consume(voicesQueue, async (msg) => {
    if (msg) {
      const jokeText = msg.content.toString();
      const voice = await generateVoice(jokeText);

      const fileName = `audio-${Date.now()}.mp3`;
      const filePath = path.join(process.cwd(), "audios", fileName);

      fs.writeFile(filePath, voice, () => {
        console.log("=======")
        console.log('Input joke text was: ');
        console.log(jokeText);
        console.log();
        console.log('Audio has successfully been written to:');
        console.log(filePath);
        console.log("=======")
      });

      await channel.ack(msg);
    }
  });
});