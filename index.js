const express = require('express')
const path = require('path')
const hbs = require('hbs')
const products = require('./data')

const app = express();
const staticPath = __dirname + "/public"
const viewPath = __dirname + "/temlates/views"


app.set('view engine', 'hbs')
app.set('views', viewPath)

hbs.registerPartials('./temlates/partials')


app.get('/', (req, res)=>{
    res.render('index', {products})
})

app.use('/public', express.static(staticPath))
/*

app.use('/', express.static(staticPath))

*/
app.get('/products', (req, res)=>{
    res.send(products)
})

app.get('/products/product/:id', (req, res)=>{
    let {id} = req.params
    let productDetails = products.find((product) => {
        return product.id === Number(id)
    })
    res.render('product', {details:productDetails})
})
app.get('*', (req, res)=>{
    res.sendStatus(404);
})
app.listen(8080, ()=>{
    console.log("Server is running at 8080 !!!!")
})