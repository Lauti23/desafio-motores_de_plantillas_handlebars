const express = require('express')
const app = express()
const handlebars = require('express-handlebars')

const port = 8080;
app.set("port", process.env.PORT || port);
app.listen(app.get("port"), () => console.log("Server http://localhost:" + app.get("port")))

app.engine('handlebars', handlebars.engine())
app.set('views', './views')
app.set('view engine', 'handlebars')
app.use(express.json())
app.use(express.urlencoded({extended: true}))

let products = []

app.get('/', (req, res) => {
    try {
        res.render('form')
    } catch (error) {
        res.send({status: 'Error', message: error.message})
    }
})

app.post('/products', (req, res) => {
    try {
        let product = req.body
        if (!product || !product.price || !product.url) {
            res.send({status: 'Error', message: 'Faltan campos por completar'})
        } else {
            console.log('REQ.BODY', req.body)
            let newId = products.length + 1
            product.id = newId
            products.push(product)
            console.log({message: 'Saved product', product})
            res.render('products', {
                products: products
            }) 
        } 
    } catch (error) {
        res.send({status: 'Error', message: error.message})
    }
    
})


