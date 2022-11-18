import passengerRepository from '../../../../src/infrastructure/repositories/mongodb/passenger.repository';
import { Passenger } from '../../../../src/domain/entities/passenger.entity';
import createPassengerHandler from '../../../../src/application/handlers/passengers/create.passenger.handler';
import { CreatePassengerCommand } from '../../../../src/application/commands/passenger/create.passenger.command';

describe('Create Passenger', () => {
  it('should create a passenger', async () => {
    const passengerMock = Passenger.create('Pepito perez', 'pepitoperez@yopmail', '12345678');
    passengerRepository.save = jest.fn().mockResolvedValueOnce(passengerMock);
    passengerRepository.findOneByIdentityCard = jest.fn().mockResolvedValueOnce(null);
    await createPassengerHandler.execute(new CreatePassengerCommand('Pepito perez','pepitoperez@yopmail.com', '12345678'));
    expect(passengerRepository.save).toBeCalled();
  });

  it('should throw an error if identity card is invalid', async () => {
    const command = new CreatePassengerCommand('Pepito perez', 'pepitoperez@yopmail.com', 'asd');
    await expect(createPassengerHandler.execute(command)).rejects.toStrictEqual( 
      new Error('Invalid identity card'),
    );
  });

  it('should throw an error if email is invalid', async () => {
    const command = new CreatePassengerCommand('Pepito perez', 'pepitoperez@yopmail', '11111111');
    await expect(createPassengerHandler.execute(command)).rejects.toStrictEqual(
      new Error('Invalid email'),
    );
  });

  it('should throw an error if passenger already exists', async () => {
    const passengerMock = Passenger.create('Pepito perez', 'pepitoperez@yopmail.com', '12345678');
    passengerRepository.findOneByIdentityCard = jest.fn().mockResolvedValueOnce(passengerMock);

    const command = new CreatePassengerCommand('Pepito perez', 'pepitoperez@yopmail.com', '12345678');
    await expect(createPassengerHandler.execute(command)).rejects.toStrictEqual(
      new Error('Passenger already exists'),
    );
  });
});
