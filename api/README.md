
# Lesson 15 - NodeJS API using NestJS framework

## NestJS Framework

* Running services with node
* Web server with node
* Using Express to run a node web server
* About using frameworks
* Using NestJS framework
* Overview of a NestJS project
* Using the CLI
* Initializing a project with NestJS
* Swagger plugin

### References
<https://nodejs.org/en/docs/guides/getting-started-guide/>

<https://devdocs.io/express-getting-started/>

<https://docs.nestjs.com/>

<https://docs.nestjs.com/openapi/introduction>

## Implementing the API

* The NestJS CLI
* Creating Resources
* Controllers, Services and Routes in NestJS
* Modules and injections (overview)
* Server configuration
* Serving scripts as services
* Params, DTOs and Payloads
* HTTP errors and messages
* (Review) Environment
* Implementing the features

### References
<https://docs.nestjs.com/cli/overview>

## Read-only data

* GET methods:
  * Query contract address
  * Query total supply
  * Query balance of a given address
  * Query transaction status by transaction hash
  * Query transaction receipt of a transaction by transaction hash

## Minting tokens

* GET methods:
  * Check if address has MINTER_ROLE role
* POST methods:
  * Request tokens to be minted

## Coupling frontend and APIs

* On-chain and off-chain features
* Keeping user Private Key private
* Mapping interactions, resources and payloads
* Handling errors

### References

<https://en.wikipedia.org/wiki/Loose_coupling>

<https://react.dev/reference/react/useEffect#fetching-data-with-effects>

<https://jasonwatmore.com/post/2020/02/01/react-fetch-http-post-request-examples>

## CORS settings

* Cross-origin resource sharing
* Allow origin errors

### Code reference
    
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(3000);


### References
<https://docs.nestjs.com/security/cors>

<https://github.com/expressjs/cors#configuration-options>

---

## Homework

* Create Github Issues with your questions about this lesson
* Read the references