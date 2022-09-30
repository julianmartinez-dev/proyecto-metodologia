// import uuidValidate from "uuid-validate";

export class FindByIdentityCard {
    private readonly identityCard: string;

    constructor(
        identityCard: string,
    ) {
        if (!identityCard) {
            throw new Error('id is required');
          }

        this.identityCard = identityCard;
    }

    getId(): string {
        return this.identityCard;
    }
}