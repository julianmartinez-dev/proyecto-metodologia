// import uuidValidate from "uuid-validate";

export class FindByIdentityCardCommand {
  private readonly identityCard: string;

  constructor(identityCard: string) {
    if (!identityCard) {
      throw new Error('id is required');
    }

    this.identityCard = identityCard;
  }

  getIdentityCard(): string {
    return this.identityCard;
  }
}
