import { Accommodation } from '../../../domain/entities/accommodation.entity';
import { mongoClient } from './mongo.configuration';

class Repository {
  private database: string = 'bookings';
  private collection = 'accommodations';

  async save(accommodation: Accommodation): Promise<void> {
    try {
      await mongoClient.connect();
      await mongoClient
        .db(this.database)
        .collection(this.collection)
        .updateOne({ id: accommodation.getId() }, { $set: accommodation }, { upsert: true });
    } catch (error) {
      console.log(error);
    } finally {
      await mongoClient.close();
    }
  }

  async findOneById(id: string): Promise<Accommodation | null> {
    try {
      await mongoClient.connect();
      const accommodation = (await mongoClient
        .db(this.database)
        .collection(this.collection)
        .findOne(
          {
            id: id,
          },
          { projection: { _id: 0 } },
        )) as Accommodation | null;
      return accommodation;
    } catch (error) {
      const { message } = error as Error;
      throw new Error(message);
    } finally {
      await mongoClient.close();
    }
  }

  async findOneByName(name: string): Promise<Accommodation | null> {
    try {
      await mongoClient.connect();
      const accommodation = (await mongoClient
        .db(this.database)
        .collection(this.collection)
        .findOne(
          {
            name: name,
          },
          { projection: { _id: 0 } },
        )) as Accommodation | null;
      return accommodation;
    } catch (error) {
      const { message } = error as Error;
      throw new Error(message);
    } finally {
      await mongoClient.close();
    }
  }
}

export default new Repository();
