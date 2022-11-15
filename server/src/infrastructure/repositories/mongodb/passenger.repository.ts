import { Passenger } from '../../../domain/entities/passenger.entity';
import { mongoClient } from './mongo.configuration';

class Repository {
  private database: string = 'bookings';
  private collection: string = 'passengers';

  async save(passenger: Passenger): Promise<void> {
    try {
      await mongoClient.connect();
      await mongoClient
        .db(this.database)
        .collection(this.collection)
        .updateOne({ id: passenger.getId() }, { $set: passenger }, { upsert: true });
    } catch (error) {
      console.log(error);
    } finally {
      await mongoClient.close();
    }
  }

  async findOneByIdentityCard(identityCard: string): Promise<Passenger | null> {
    try {
      await mongoClient.connect();
      const passenger = (await mongoClient
        .db(this.database)
        .collection(this.collection)
        .findOne(
          {
            identityCard: identityCard,
          },
          { projection: { _id: 0 } },
        )) as Passenger | null;

      return passenger;
    } catch (error) {
      const { message } = error as Error;
      throw new Error(message);
    } finally {
      await mongoClient.close();
    }
  }

  async getAllPassengers(): Promise<Passenger[] | null> {
    try {
      await mongoClient.connect();
      const passengers = (await mongoClient
        .db(this.database)
        .collection(this.collection)
        .find({}, { projection: { _id: 0 } })
        .toArray()) as unknown as Passenger[] | null;
      return passengers;
    } catch (error) {
      const { message } = error as Error;
      throw new Error(message);
    } finally {
      await mongoClient.close();
    }
  }

  async findOneById(id: string): Promise<Passenger | null> {
    try {
      await mongoClient.connect();
      const passenger = (await mongoClient
        .db(this.database)
        .collection(this.collection)
        .findOne(
          {
            id: id,
          },
          { projection: { _id: 0 } },
        )) as Passenger | null;
      return passenger;
    } catch (error) {
      const { message } = error as Error;
      throw new Error(message);
    } finally {
      await mongoClient.close();
    }
  }
}

export default new Repository();
