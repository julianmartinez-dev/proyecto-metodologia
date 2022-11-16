import { Accommodation } from '../../domain/entities/accommodation.entity';
import { Passenger } from '../../domain/entities/passenger.entity';
import accommodationRepository from '../repositories/mongodb/accomodation.repository';
import passengerRepository from '../repositories/mongodb/passenger.repository';

export class MongoDBSeeder {
  private accommodations: Array<Accommodation> = [];
  private passengers: Array<Passenger> = [];

  constructor() {
    this.accommodations.push(Accommodation.create('Single', 100));
    this.accommodations.push(Accommodation.create('Double', 150));
    this.accommodations.push(Accommodation.create('Triple', 250));
    this.accommodations.push(Accommodation.create('Chalet', 500));
    this.accommodations.push(Accommodation.create('Shared', 75));
    this.accommodations.push(Accommodation.create('Cottage', 300));
    this.accommodations.push(Accommodation.create('Five Stars', 1000));
    this.accommodations.push(Accommodation.create('Penthouse', 1200));

    this.passengers.push(Passenger.create('John Doe','john@doe.com', '12345678'));
    this.passengers.push(Passenger.create('Jane Doe','jane@doe.com', '12345679'));
    this.passengers.push(Passenger.create('John Smith', 'john@smith.com', '12345680'));
    this.passengers.push(Passenger.create('Jane Smith', 'jane@smith.com', '12345681'));
    this.passengers.push(Passenger.create('Cristian Hank', 'cristian@hank.com', '12345682'));
    this.passengers.push(Passenger.create('Cristina Hank', 'cristina@hank.com', '12345683'));
  }

  public async generate(): Promise<void> {
    for (const accomodation of this.accommodations) {
      await accommodationRepository.save(accomodation);
    }
    for(const passenger of this.passengers) {
      await passengerRepository.save(passenger);
    }
  }
}
