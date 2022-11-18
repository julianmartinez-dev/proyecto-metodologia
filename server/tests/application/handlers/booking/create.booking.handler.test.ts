
import { CreateBookingCommand } from "../../../../src/application/commands/booking/create.booking.command";
import createBookingHandler from "../../../../src/application/handlers/booking/create.booking.handler";

describe('Create Booking', () => {
    it('should throw and error if owner is not in passengers list', async () => {
        const command = new CreateBookingCommand(
            '8067cf2b-d693-4b27-b8f9-bb979cd26f3c',
            [
            '74a13aab-ca65-4203-9bb2-311185fed6c8',
            '47f688d2-c5c0-4103-96f0-7c8b053e09a3',
            ],
            '8972a023-b914-4b96-ad6e-bb3d38db705c',
            new Date('2021-01-01'),
            new Date('2021-01-03'),
        );
        await expect(createBookingHandler.execute(command)).rejects.toStrictEqual(new Error('Owner must be in passengers list'));
    })

    it('should throw an error if from date is after to date', async () => {
        const command = new CreateBookingCommand(
            '8067cf2b-d693-4b27-b8f9-bb979cd26f3c',
            [
            '74a13aab-ca65-4203-9bb2-311185fed6c8',
            '47f688d2-c5c0-4103-96f0-7c8b053e09a3',
            '8067cf2b-d693-4b27-b8f9-bb979cd26f3c',
            ],
            '8972a023-b914-4b96-ad6e-bb3d38db705c',
            new Date('2021-01-03'),
            new Date('2021-01-01'),
        );
        await expect(createBookingHandler.execute(command)).rejects.toStrictEqual(
          new Error('(From) date must be before (to) date'),
        );
    })

});