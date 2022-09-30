export class CreatePassengerCommand {
    private readonly fullname: string;
    private readonly email: string;
    private readonly identityCard: string;

    constructor(
        fullname: string,
        email: string,
        identityCard: string,
    ) {
        this.fullname = fullname;
        this.email = email;
        this.identityCard = identityCard;
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