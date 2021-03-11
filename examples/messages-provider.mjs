const faker = (_, iteration) => ({
  id: iteration + 1,
  hash: Math.random().toString(16).slice(2),
  timestamp: Date.now(),
});

const messages = Array.from({ length: 30 }, faker);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function* messenger() {
  while (messages.length) {
    // eslint-disable-next-line no-await-in-loop
    await sleep(1000);

    const message = messages.shift();

    yield { topic: "stub-topic", message };
  }
}
