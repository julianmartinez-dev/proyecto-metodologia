export class CreateAccommodationCommand {
  private readonly name: string;
  private readonly pricePerNight: number;

  constructor(name: string, pricePerNight: number) {
    this.name = name;
    this.pricePerNight = pricePerNight;
  }

  getName(): string {
    return this.name;
  }

  getPricePerNight(): number {
    return this.pricePerNight;
  }
}
