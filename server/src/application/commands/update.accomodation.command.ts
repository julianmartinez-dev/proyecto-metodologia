import uuidValidate from 'uuid-validate';


export class UpdateAccomodationCommand {
  private readonly id: string;
  private readonly name: string;
  private readonly pricePerNight: number;

  constructor(id: string, name: string, pricePerNight: number) {
    if (!uuidValidate(id)) {
      throw new Error('id must be a valid uuid');
    }

    if (!name) {
      throw new Error('name must be specified');
    }

    if (!pricePerNight) {
      throw new Error('pricePerNight must be specified');
    }

    this.id = id;
    this.name = name;
    this.pricePerNight = pricePerNight;
  }

    getId(): string {
        return this.id;
    }
    getName(): string {
        return this.name;
    }
    getPricePerNight(): number {
        return this.pricePerNight;
    }
}