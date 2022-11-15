import { Booking } from '../../../domain/entities/booking.entity';
import { mongoClient } from './mongo.configuration';

class Repository {
  private database: string = 'bookings';
  private collection: string = 'bookings';

  async save(booking: Booking): Promise<void> {
    try {
      await mongoClient.connect();
      await mongoClient
        .db(this.database)
        .collection(this.collection)
        .updateOne({ id: booking.getId() }, { $set: booking }, { upsert: true });
    } catch (error) {
      console.log(error);
    } finally {
      await mongoClient.close();
    }
  }

  async findOneById(id: string): Promise<Booking | null> {
    try {
      await mongoClient.connect();
      const booking = (await mongoClient
        .db(this.database)
        .collection(this.collection)
        .findOne(
          {
            id: id,
          },
          { projection: { _id: 0 } },
        )) as Booking | null;
      return booking;
    } catch (error) {
      const { message } = error as Error;
      throw new Error(message);
    } finally {
      await mongoClient.close();
    }
  }


  async findOneByNameAndFromDate(name: string, from: Date): Promise<Booking | null> {
    try {
      await mongoClient.connect();
      const booking = (await mongoClient
        .db(this.database)
        .collection(this.collection)
        .findOne(
          {
            from: from,
            name: name,
          },
          { projection: { _id: 0 } },
        )) as Booking | null;

      return booking;
    } catch (error) {
      const { message } = error as Error;
      throw new Error(message);
    } finally {
      await mongoClient.close();
    }
  }
}

export default new Repository();
