const express = require('express')
const app = express()
const cors = require('cors')
const port = 3001
const router = require('./router/router.js');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: '*'
}));
app.use(router);



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})