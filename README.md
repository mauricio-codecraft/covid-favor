# Onfido POC

Ionic 4 application using the onfido mobile API. This version has two features (two buttons).
1) Call a public API (using HTTP GET) - No CORS error since it is a GET
2) Call Onfido API (using HTTP POST) - CORS error!

## Disclaimer

This code is meant to be an example only.
Don't use it straight away in production without reviewing it and without careful consideration.

## Requirements

### Node

- Node.js for interacting with the Ionic ecosystem. v10.17.0 (Suggestion use NVM (Node Version Manager): https://github.com/nvm-sh/nvm)

### Ionic

- Ionic v5.4.5 used for this application

## Running

1. `npm install`
2. `ionic serve`

This should run an appserver on http://localhost:8101/.

## Deployment

- The front end application is hosted at: http://codecraft-onfido-poc.s3-website-us-east-1.amazonaws.com

- To build and deploy the application to S3 run:
1. `./deploy.sh`
