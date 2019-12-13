const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json)
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
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
  const roles = auth.split(' ')[1] === 'admin' ? ['admin'] : ['editor']
  res.json({
    code: 1,
    data: roles
  })
})

app.listen(3000, () => {
  console.log('成功')
})
