//tracking the stock

//dealing with stock
.get('/stock')  STATUS:200//this responds with a list of everything that is in stock and it's quantity

.get('/stock/:item') STATUS:200//this reponds with the stock of a specific item

.put('/stock/:item') STATUS:200//use this to update the amount of stock for item

.delete('/stock/:item') STATUS:200 //if you don't hold this item in stock anymore, you delete it here

.post('/stock/:item') STATUS:201//you have a new item in stock, you create it here

//dealing with costumers (collecting their data to anticipate orders)
.get('/costumers') //you get a list of costumers that have come in before

.get('/costumer/:id') //you get a specific costumer by it's id

.get('/costumer/:id/order') //you get the costumer's last order

.post('/costumers') STATUS:201 //here you add a new costumer to the list

.patch("/costumer/:id/order") //use this to update costumers order

//dealing with available seating
.get('/seats') //shows a list of available seats {seat1: 'busy' seat2: 'free' etc}

.patch('/seat/:num') //updates the seat with the numbers status, if it's busy or free

.delete('/seat/:num') //if the chair is broken or removed, deletes it from our list of seats

.post('/seats/new/:num') STATUS:201 //updates the amount of seats with the creation of one new num seat