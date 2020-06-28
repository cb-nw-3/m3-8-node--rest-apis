# Exercise 1 - API Architecture

There s a corner cafe that wants your help to propel itself into the digital age... The owner, Greg, has read extensively and is anxious to get started, but lacks the technical chops to get his digital transformation off the ground. He knows that big data is the way to go. He is planning on tracking everything in his cafe.

He needs an RESTful API to serve all of the data that he'll have and gather more!

He's asked a couple of future developers to architect this API for him.

He wants to track everything from the stock, the customers, the seating in the cafe.

Provide him with a series of REST endpoints that meet all, or most of the RESTful principles that you've just heard about! Your feedback will dictate how the database will eventually be built... no pressure.

### MY ANSWER

Greg wants to track the following:

- Store Inventory (stock)
- Customers
- Seating

These three categories will be our routing endpoints that will follow along like this:

`https//API.GREGSDATA/stock`

`https//API.GREGSDATA/customers`

`https//API.GREGSDATA/seating`

as an example, if we were to reach the stock endpoint we would want to have the following data

```js
{
  ...
  coffeeFilters: 5000,
  cofeeBeans: 10000,
  cofeeTypes: {"Americano","Espresso","Latte","Cappuccino" },
  cream: {"10%", "5%"},
  ...
}
```

the customers database might be more of an array of users (perhaps those that have membership cards that can be scanned upon purchase of an item, so that it may be kept track of) which can be used to determine consumer trends or preferences.

The seating could be more of a real time API, that generates `PUT` or `PATCH` methods depending on the current seating. i.e.

When a Client enters the store

`GET current_available_seats`

When a Client choose a seat

`POST seats_taken`

When a client leaves a seat

`PUT seats_available`
