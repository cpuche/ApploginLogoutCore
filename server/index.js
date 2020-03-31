const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')

// urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let sessionConfig = {
  secret: '#MojaveSun&777',
  resave: false,
  saveUninitialized: true
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sessionConfig = {
    secret: '#MojaveSun&777',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }
}

app.use(session(sessionConfig))

app.get('/logout', function(req, res) {
  req.session.apiConnectionEstatus = false
  res.send(true)
})

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
