# @hitmands/kafka-producer-stub

Simple Kafka stack to facilitate the local development of Consumers

- <https://hub.docker.com/r/hitmands/kafka-producer-stub>

## Getting Started

```shell
docker run -tid \
  -e 'HKPS_BROKERS=localhost:9092' \
  -v $(pwd)/examples:/data \
  hitmands/kafka-producer-stub:latest
```

## Environment

- `HKPS_` prefix is used to namespace variables

```shell
HKPS_BROKERS='localhost:9092'
```

## Producing Messages

- You can look at our [example](./examples/messages-provider.mjs)

```ts
// messages-provider.mjs

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const messages = ["Hello World", "Hello Galaxy", "Hello Universe"];

export async function* messenger() {
  while (messages.length) {
    await sleep(1000);

    const message = messages.shift();

    // optional
    const options = { partition: null, key: null, ts: Date.now() };

    yield { topic: "stub-topic", message, options };
  }
}
```

## Using the docker-compose of this repo

```shell
curl -sSL https://raw.githubusercontent.com/hitmands/kafka-producer-stub/main/docker-compose.yml > docker-compose.yml
docker-compose up -d
```
