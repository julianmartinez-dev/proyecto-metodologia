import passengerRepository from "../../../src/infrastructure/repositories/passenger.repository";
import {Passenger} from "../../../src/domain/entities/passenger.entity";
import findPassengerHandler from "../../../src/application/handlers/passengers/find.passenger.handler";
import {
  FindByIdentityCardCommand
} from "../../../src/application/commands/passenger/findByIdentityCard.passenger.command";

describe('Find Passenger Handler', () => {
  it('should be find passenger', async () => {
    const passengerMock = Passenger.create('Pepito perez', 'pepitoperez@yopmail.com', '12345678');
    passengerRepository.findOneByIdentityCard = jest.fn().mockResolvedValue(passengerMock);

    const result = await findPassengerHandler.execute(new FindByIdentityCardCommand('12345678'));

    expect(result).toStrictEqual(passengerMock);
  });

  it('should be thrown an error when passenger not found', async () => {
    passengerRepository.findOneByIdentityCard = jest.fn().mockResolvedValue(null);

    await expect(findPassengerHandler.execute(new FindByIdentityCardCommand('12345678'))).rejects.toStrictEqual(new Error('Passenger not found'));
  })
})
