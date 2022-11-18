import { Accommodation } from '../../domain/entities/accommodation.entity';
import accommodationRepository from '../repositories/memory/accommodation.repository';

export class Seeder {
  private accommodations: Array<Accommodation> = [];
  constructor() {
    this.accommodations.push(new Accommodation('33', 'tourist', 1233));
    this.accommodations.push(new Accommodation('25', 'first class', 2525));
    this.accommodations.push(new Accommodation('11', 'first class', 2750));
    this.accommodations.push(new Accommodation('03', 'first class', 3100));
    this.accommodations.push(new Accommodation('28', 'first class', 2525));
    this.accommodations.push(new Accommodation('44', 'tourist', 1233));
    this.accommodations.push(new Accommodation('10', 'first class', 2750));
    this.accommodations.push(new Accommodation('05', 'first class', 3100));
    this.accommodations.push(new Accommodation('85', 'tourist', 780));
    this.accommodations.push(new Accommodation('31', 'tourist', 1233));
    this.accommodations.push(new Accommodation('30', 'tourist', 1233));
  }

  public async generate(): Promise<void> {
    for (const accomodation of this.accommodations) {
      await accommodationRepository.save(accomodation);
    }
  }
}
