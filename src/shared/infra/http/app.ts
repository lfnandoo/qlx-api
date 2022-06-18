import express from 'express';
import http from 'http';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { createSchema } from '../../graphql/schema';
import { appDataSource } from '../../typeorm/data-source';

class App {
  app: express.Application;

  constructor() {
    this.app = express();

    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeGraphQLServer();
  }

  public listen() {
    const port = process.env.PORT || 8080;
    this.app.listen(port, () => {
      console.log(`App is running at http://localhost:${port}`);
    });
  }

  private async connectToTheDatabase() {
    try {
      await appDataSource.initialize();
    } catch (error) {
      console.log(`Database connection error: ${error}`);
    }
  }

  private initializeMiddlewares() {
    this.app.use(cors());
  }

  private async initializeGraphQLServer() {
    const httpServer = http.createServer(this.app);

    const apolloServer = new ApolloServer({
      schema: await createSchema(),
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({ app: this.app, path: '/graphql' });
  }
}

export { App };
