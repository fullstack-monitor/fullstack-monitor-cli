# Fullstack-Monitor-CLI

## About
Fullstack-monitor-CLI is log monitoring tools for developers, offering visibility of console logs, requests and responses from both the Client and Server side of your application in one single place.

This makes it easy to see what is happening across the stack as your front and back-end communicate.

In order to use this, you must also install the [Fullstack-Monitor](https://github.com/PFA-Pink-Fairy-Armadillo/fullstack-monitor) into the project you want to monitor.

- [Fullstack-Monitor Github](https://github.com/PFA-Pink-Fairy-Armadillo/fullstack-monitor).
- [Fullstack-Monitor NPM Package](https://www.npmjs.com/package/fullstack-monitor)

- [Fullstack-Monitor-CLI NPM Package](https://www.npmjs.com/package/fullstack-monitor-cli).


## Instructions

1. Globally install `Fullstack-Monitor-CLI`
```
$ npm install -g fullstack-monitor-cli
```
2. Install `Fullstack-Monitor` into the project you wish to monitor:
```
$ npm install fullstack-monitor`
```
3. Follow the instructions [here](https://github.com/PFA-Pink-Fairy-Armadillo/fullstack-monitor) to configure `Fullstack-Monitor` in your project.
4. Boot the `Fullstack-Monitor-CLI` server.
```
$ fullstack-monitor-cli --start
```
5. Open the browser interface to view the logs:
```
$ fullstack-monitor-cli --chrome
```
6. Listen to logs in the terminal
```
$ fullstack-monitor-cli --listen
```
7. When you are done monitoring kill the server.
```
$ fullstack-monitor-cli --kill
```

## Contributors

- Paulo
- Tom
- Aye
- Mohammed
