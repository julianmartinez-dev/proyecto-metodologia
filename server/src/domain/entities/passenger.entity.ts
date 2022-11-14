import { v4 } from 'uuid';

export class Passenger {
  //propiedades
  private id: string;
  private fullname: string;
  private email: string;
  private identityCard: string;
  //constructor
  constructor(id: string, fullname: string, email: string, identityCard: string) {
    this.id = id;
    this.fullname = fullname;
    this.email = email;
    this.identityCard = identityCard;
  }

  //metodos
  public static create(fullname: string, email: string, identityCard: string): Passenger {
    const id = v4();
    const passeger = new Passenger(id, fullname, email, identityCard);

    return passeger;
  }

  static fromPrimitives(primitives: any): Passenger {
    const passenger = new Passenger(primitives.id, primitives.fullname, primitives.email, primitives.identityCard);

    return passenger;
  }
  changeFullname(fullname: string): void {
    this.fullname = fullname;
  }
  changeEmail(email: string): void {
    this.email = email;
  }
  changeIdentityCard(identityCard: string): void {
    this.identityCard = identityCard;
  }

  getId(): string {
    return this.id;
  }
  getFullName(): string {
    return this.fullname;
  }
  getEmail(): string {
    return this.email;
  }
  getIdentityCard(): string {
    return this.identityCard;
  }
  toPrimitives(): any {
    return {
      id: this.id,
      fullname: this.fullname,
      email: this.email,
      identityCard: this.identityCard,
    };
  }
}
