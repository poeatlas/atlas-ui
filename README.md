This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Table of Contents

- [About](#about)
- [Prerequisites](#prerequisites)
- [Extracting Content.ggpk Assets](#extracting-content.ggpk-assets)
- [Building Atlas UI](#buidling-atlas-ui)


## About

This is a static webapp designed to mimic the Path of Exile Atlas 
to help players plan and share their map progression.

## Prerequisites

* Nodejs v7.10.1

## Extracting Content.ggpk Assets

At the moment this app is run on Linux with a mysql docker container. However, the app should be
able to be run on other operating systems (e.g. Windows) and without docker.

Begin by running mysql in a docker container:

```sh
docker run --name mysql \
     -e MYSQL_DATABASE=poeatlas \
     -e MYSQL_ALLOW_EMPTY_PASSWORD=yes \
     -e MYSQL_USER=poeatlas \
     -e MYSQL_PASSWORD=poeatlas\
     -d mysql/mysql-server
```

Build the POE CLI:

```sh
  ./gradlew clean build
```

Create atlas.json file:

```sh
  java -jar dat.jar -input /usr/src/app/Data/ -output /usr/src/app/output/atlas.json
```

Convert dds files to png:

```sh
  java -jar dds.jar -mipmap 1 -root /usr/src/app/ ${find . -name '*.dds'}
```

## Building Atlas UI

To build the Atlas UI, go to your cloned directory and run the following commands:

```sh
    npm install
    npm run build
```