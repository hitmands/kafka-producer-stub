export const createDispatcher = (clientId, producer) => ({
  dispatch: (
    topic,
    message,
    { partition = null, key = null, ts = Date.now() } = {}
  ) => {
    console.log(
      `${clientId} / Producer.Dispatcher.Dispatch('${topic}')`,
      message
    );

    return producer.produce(
      topic,
      partition,
      Buffer.from(JSON.stringify(message)),
      null,
      ts
    );
  },
});
