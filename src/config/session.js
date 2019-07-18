import sesstion from 'express-session'
import connectMongo from 'connect-mongo'
let MongoStore = connectMongo(sesstion)

let sessionStore = new MongoStore({
  
  url : `mongodb://localhost:27017/webChatDatabase`,
  // url : `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
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