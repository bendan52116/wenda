import express from 'express'
import config from './config'
import nunjucks from 'nunjucks'
import { join } from 'path'
import indexRouter from './routes/index'
import accountRouter from './routes/account'
import bodyParser from 'body-parser'


const app = express()

// 配置静态资源
app.use('/static', express.static(join(__dirname, '../static')))
app.use('/node_modules', express.static(join(__dirname, '../node_modules')))

// 配置视图路径
// 第一个参数：当你通过 res.render 的时候，它会从你配置好的目录中去找模板文件
// express: app 将 app 配置给 nunjucks，这样的话在后续代码中就可以使用 res.render 函数了
// watch 表示监视文件的改动，如果文件发生变化，则模板引擎会帮你渲染新的内容
//       在开发环境，配置 watch 为 true，到生产环境，将 watch 变为 false
nunjucks.configure(config.viewPath, {
  autoescape: true,
  express: app,
  watch: true,
  noCache: false
})
// 配置 body-parser 中间件
// 作用：解析表单 post 请求体
//       将解析到的 post 请求体作为一个对象挂载给 req.body
//       在后续的处理过程中，就可以直接通过 req.body 来访问表单 post 请求体数据
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(indexRouter)
app.use(accountRouter)
// app.get('/', (req, res) => {
//   res.render('index.html')
// })

// app.get('/account/register', (req, res) => {
//   res.render('register.html')
// })

// app.get('/account/login', (req, res) => {
//   res.render('login.html')
// })

app.listen(config.port, config.host, () => {
  console.log(`Server is running at port ${config.port}`)
  console.log(`Please visit http://${config.host}:${config.port}/`)
})
