import Kafka from "node-rdkafka";
import { createDispatcher } from "./dispatcher.mjs";

const { HKPS_BROKERS = "0.0.0.0:9092" } = process.env;

export const start = async ({ clientId, messenger }) => {
  const connection = {
    "client.id": clientId,
    "metadata.broker.list": HKPS_BROKERS,
  };

  const producer = new Kafka.Producer({
    ...connection,
    dr_cb: true,
  });

  console.log(`${clientId} / Producer.CreateInstance`, connection);

  const dispatcher = createDispatcher(clientId, producer);

  return producer
    .on("ready", async () => {
      console.log(`${clientId} / Producer.Ready`);

      for await (const { topic, message, options } of messenger()) {
        dispatcher.dispatch(topic, Buffer(JSON.stringify(message)), options);
      }

      console.log(`${clientId} / Producer.Done`);
      process.exit(0);
    })
    .on("event.error", (error) => {
      console.error(`${clientId} / Producer.Error`);
      console.error(error);
    })
    .on("event.log", (log) => {
      console.log(`${clientId} / Producer.Event.Log`, log);
    })
    .on("delivery-report", (err, report) => {
      console.log(`${clientId} / Producer.DeliveryReport`, report);
    })
    .connect();
};
