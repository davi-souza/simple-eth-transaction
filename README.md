# Simple ETH Transaction Project

## Run locally

Make sure there is a MongoDB active in your machine

Install dependencies

```bash
yarn
```

Create a `.env` file (use `.env.example` as a guide) and set the environment variables values

Run the the development server

```bash
yarn dev
```

And go to [http://localhost:3000](http://localhost:3000) to access the project

### Run using docker

Create a `.env` file (use `.env.example` as a guide) and set the environment variables values

Run the following command to start a mongodb container

```bash
docker run -it -d --rm --name mongodb \
    --network default-network \
    -e MONGO_INITDB_ROOT_USERNAME=mongoadmin \
    -e MONGO_INITDB_ROOT_PASSWORD=secret \
    -e MONGO_INITDB_DATABASE=setp-db \
    -p 27017:27017 \
    -v setp-mongodb:/data/db \
    mongo:5.0.6-focal
```

Run the following command to start a node container using its terminal

```bash
docker run -it --rm --name setp \
    --network default-network \
    -p 3000:3000 \
    -v $(pwd):/setp \
    -w /setp \
    node:16-alpine \
    /bin/sh
```

Once inside the node container, first you need to run

```bash
yarn
```

After that you can run

```bash
yarn dev
```

And you can go to [http://localhost:3000](http://localhost:3000) to access the project
