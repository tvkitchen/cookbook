# examples

A repository of example TV Kitchen implementations.

## Requirements

- Docker

## Usage

```sh
yarn start:kafka
# wait a bit for Kafka to start
yarn start <recipe>
# e.g. yarn start extracting-captions
```

## Development

To add a new recipe, make a new directory in the recipe folder, add a package.json and your workflow. Then, just add the recipe and any new non-Node dependencies to the [Dockerfile](Dockerfile) and [Docker Compose](docker-compose.yml) files.
