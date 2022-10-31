import { Passenger } from '../../domain/entities/passenger.entity';

class Repository {
  private passengers: Passenger[];
  constructor() {
    this.passengers = [];
  }

  //metodo para guardar un pasajero
  async save(passenger: Passenger): Promise<void> {
    const savePassenger = this.passengers.find(u => u.getId() === passenger.getId());

    if (savePassenger) {
      this.passengers.splice(this.passengers.indexOf(savePassenger), 1);
    }
    this.passengers.push(passenger);
  }

  //metodo para buscar por identificacion
  async findOneByIdentityCard(identityCard: string): Promise<Passenger | null> {
    const passenger = this.passengers.find(u => u.getIdentityCard() === identityCard);
    return passenger ? passenger : null;
  }

  async getAllPassengers(): Promise<Passenger[]> {
    return this.passengers;
  }

  async findOneById(id: string): Promise<Passenger | null> {
    const passenger = this.passengers.find(u => u.getId() === id);
    return passenger ? passenger : null;
  }
}

export default new Repository();
