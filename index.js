const express = require('express')
const axios=require('axios')
const app = express()
const port = 3010

app.use(express.json()) 

//app.matchHttpMethod(url,callFnc)

app.get('/',function(req,res){
    res.send('response from express server')
})

app.get('/users/gender',function(req,res){
    console.log(req.query) // list of parameters-values pair are returned through req.query as an object.
    const name = req.query.name
    if(name){
        const url = `https://api.genderize.io/?name=${name}`
        axios.get(url)
        .then(response => {
            //console.log(response.data.gender)
            const gender = response.data.gender
            const user = {name,gender}
            res.json(user)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    else {
        res.json({error:"name not specified"})
    }
})

app.use(function(req,res){
    res.status(404).send('The page you are looking for doesnt exists')
})

app.listen(port,()=>{
    console.log('listening on port ',port)
})
