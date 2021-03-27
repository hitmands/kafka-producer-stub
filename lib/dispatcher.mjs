export const createDispatcher = (clientId, producer) => ({
  dispatch: (
    topic,
    message,
    { partition = null, key = null, ts = Date.now() } = {}
  ) => {
    console.log(`${clientId} / Producer.Dispatcher.Dispatch('${topic}')`);

    return producer.produce(topic, partition, message, null, ts);
  },
});
