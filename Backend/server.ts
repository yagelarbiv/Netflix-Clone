import express from 'express';
import { remultExpress } from 'remult/remult-express';
import { MongoClient } from "mongodb"
import { MongoDataProvider } from "remult/remult-mongo"
import userRouter from './Routes/userRouter';
import { User } from './entities/User';

const app = express();

app.use('/api/v1/users', userRouter);

app.use(
  remultExpress({
    entities: [User],
    dataProvider: async () => {
      const client = new MongoClient(process.env.MONGO_DB_CONNECTION_STRING || 'mongodb+srv://yagelarbiv3:3cj3JCTycSe17vAN@cluster0.vlxquk7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
      await client.connect()
      return new MongoDataProvider(client.db("test"), client)
    }
  })
);

app.listen(process.env.PORT || 5000);