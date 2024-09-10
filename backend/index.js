import app from "./server.js"
import mongodb from "mongodb"
import madk_com from "./winterDAO/winterDAO.js"

const MONGO_USERNAME = 'anhkhoa101003'
const MONGO_PASSWORD = '101003'
const MongoClient = mongodb.MongoClient
const mongo_username = MONGO_USERNAME
const mongo_password = MONGO_PASSWORD
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.bvhcc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const port = 8000

MongoClient.connect(
  uri,
  {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
    useNewUrlParser: true
  })
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })
  .then(async client => {
    await madk_com.injectDB(client)
    app.listen(port, () => {
      console.log(`listening on port ${port}`)
    })
  })