import sesstion from 'express-session'
import connectMongo from 'connect-mongo'
let MongoStore = connectMongo(sesstion)

let sessionStore = new MongoStore({
  url : `mongodb://localhost:27017/webChatDatabase`,
  autoReconnect: true
})

let configSession = (app) => {
  app.use(sesstion({
    key: "express.sid",
    secret: "mySecret",
    store : sessionStore,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24
    }
  }))
}
module.exports = configSession