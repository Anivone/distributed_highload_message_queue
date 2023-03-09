import { connect } from "amqplib";
import { jokesQueue, RABBITMQ_CONNECTION_URL, voicesQueue } from "./constants";
import { CommandArg } from "./types";

const [arg] = process.argv.slice(2);

const executeCommand = async () => {
  const command = arg as CommandArg;
  console.log(command);

  const connection = await connect(RABBITMQ_CONNECTION_URL);
  const channel = await connection.createChannel();

  await channel.assertQueue(jokesQueue);
  await channel.assertQueue(voicesQueue);

  switch (command) {
    case CommandArg.GenerateJoke: {
      channel.sendToQueue(
        jokesQueue,
        Buffer.from(`${CommandArg.GenerateJoke} executed !`)
      );
      break;
    }
  }

  await channel.close();
  await connection.close();

  process.exit(0);
};

executeCommand();
