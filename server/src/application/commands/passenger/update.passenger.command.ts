import uuidValidate from 'uuid-validate';

export class UpdatePassengerCommand {
  private readonly id: string;
  private readonly fullname: string;
  private readonly email: string;
  private readonly identityCard: string;

  constructor(id: string, fullname: string, email: string, identityCard: string) {
    if (!uuidValidate(id)) {
      throw new Error('id must be a valid uuid');
    }

    if (!fullname) {
      throw new Error('fullname must be specified');
    }

    if (!email) {
      throw new Error('email must be specified');
    }

    if (!identityCard) {
      throw new Error('identityCard must be specified');
    }

    this.id = id;
    this.fullname = fullname;
    this.email = email;
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
}
