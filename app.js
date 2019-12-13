const express = require('express')
const app = express()
// express 4.0 以后不支持 body-parser
const bodyParser = require('body-parser')
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(bodyParser.json())

app.post('/user/login', (req, res) => {
  console.log(req.body)
  const { username } = req.body
  if (username === 'admin') {
    res.json({
      code: 1,
      data: username
    })
  } else {
    res.json({
      code: 10204,
      message: '用户名或密码错误'
    })
  }
})
app.get('/user/info', (req, res) => {
  const auth = req.headers['authorization']
  if(auth) {
    const roles = auth.split(' ')[1] === 'admin' ? ['admin'] : ['editor']
    res.json({
      code: 1,
      data: roles
    })
  } else {
    res.json({
      code: 10024,
      message:'未登陆'
    })
  }
  
})

app.get('/', (req, res)=>{
  res.send('Hello world');
});

app.listen(3000, () => {
  console.log(`http://localhost:3000`)
})


// const express = require('express')
// const app = express()

// app.get('/', (req, res) => res.send('Hello World!'))

// app.listen(3000, () => console.log('Example app listening on port 3000!'))