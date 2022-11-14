import { Passenger } from '../../../domain/entities/passenger.entity';
import { mongoClient } from './mongo.configuration';

class Repository {
  private passengers: Passenger[];
  constructor() {
    this.passengers = [];
  }

  //metodo para guardar un pasajero
  async save(passenger: Passenger): Promise<void> {
    try {
      await mongoClient.connect();
      await mongoClient.db('bookings').collection('passengers').insertOne(passenger);
    } catch (error) {
      console.log(error);
    } finally {
      await mongoClient.close();
    }
  }

  //metodo para buscar por identificacion
  async findOneByIdentityCard(identityCard: string): Promise<Passenger | null> {
    try {
      await mongoClient.connect();
      const passenger = (await mongoClient
        .db('bookings')
        .collection('passengers')
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
        .db('bookings')
        .collection('passengers')
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
       .db('bookings')
       .collection('passengers')
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
