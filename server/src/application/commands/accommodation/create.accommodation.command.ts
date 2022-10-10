export class CreateAccommodationCommand {
  private readonly id: string;
  private readonly name: string;
  private readonly pricePerNight: number;

  constructor(id: string, name: string, pricePerNight: number) {
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
