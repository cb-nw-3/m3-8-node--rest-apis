## Exercise 1 - API Architecture

There s a corner cafe that wants your help to propel itself into the digital age... The owner, Greg, has read extensively and is anxious to get started, but lacks the technical chops to get his digital transformation off the ground. He _knows_ that big data is the way to go. He is planning on tracking _everything_ in his cafe.

He needs an RESTful API to serve all of the data that he'll have and gather more!

He's asked a couple of future developers to architect this API for him.

He wants to track _everything_ from the stock, the customers, the seating in the cafe.

Provide him with a series of REST endpoints that meet all, or most of the RESTful principles that you've just heard about! Your feedback will dictate how the database will eventually be built... no pressure.

_This activity is more about the discussion in how to best organize data endpoints. There will not be any coding, unless you really want to provide Greg with working endpoints that he can test in Insomnia._

```js
`
A client place an order
IF (Accepted)
    GET /products OR /product/:id
    POST /products OR /product/:id

    The client decides to increase its order qty
    PUT /product/:id

    The client change his mind and choose a different coffee
    DELETE /product/:id
    GET /product/:id
    POST /product/:id

    The client decides to stay inside to drink his coffee
    GET /seats
    POST /seat/:id
    PATCH /seat/:id

    The store representant ask the client his email address to retrieve his profile
    GET /users/:id
    POST /users/:id
    PATCH /users/:id (if any partial update needed)

    The store representant update seats availability once the client leaves
    GET /seats
    POST /seats
    PATCH /seats/:id

ELSE (Rejected)
    GET /products OR /product/:id
    POST /products (with error info)

NOTE: To be discussed with TC

`
- `GET    /products`     - Retrieves a list of product
- `GET    /product/12`  - Retrieves a specific product
- `POST   /products`     - Creates a new product
- `PUT    /product/12`  - Updates product #12
- `PATCH  /products/12`  - Partially updates product #12
- `DELETE /products/12`  - Deletes product #12

## HTTP Codes

- `200` OK — Show that the operation performed is successful.
- `201` CREATED — When you use POST method to create a new resource.
- `202` ACCEPTED — Acknowledge the request sent to the server.
- `400` BAD REQUEST — When client-side input validation fails.
- `401` UNAUTHORIZED / `403` FORBIDDEN — When the user or the system is not authorized to perform an operation.
- `404` NOT FOUND — When looking for certain resource and it is not available in the system.
- `500` INTERNAL SERVER ERROR — Should never be thrown explicitly but might occur if the system fails.
- `502` BAD GATEWAY — When the server received an invalid response from the upstream server.

```
