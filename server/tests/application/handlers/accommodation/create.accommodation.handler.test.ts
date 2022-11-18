import accommodationRepository from '../../../../src/infrastructure/repositories/mongodb/accomodation.repository';
import { Accommodation } from '../../../../src/domain/entities/accommodation.entity';
import { CreateAccommodationCommand } from '../../../../src/application/commands/accommodation/create.accommodation.command';
import createAccommodationHandler from '../../../../src/application/handlers/accommodation/create.accommodation.handler';

describe('Create Accommodation', () => {
  it('should create an accommodation', async () => {
    const accommodationMock = Accommodation.create('Hotel', 50);
    accommodationRepository.save = jest.fn().mockResolvedValueOnce(accommodationMock);
    await createAccommodationHandler.execute(new CreateAccommodationCommand('Hotel', 50));
    expect(accommodationRepository.save).toBeCalled();
  });

  it('should throw an error if price per night is negative', async () => {
    const command = new CreateAccommodationCommand('Hotel', -123);
    await expect(createAccommodationHandler.execute(command)).rejects.toStrictEqual(new Error('Invalid PricePerNight'));
  });
});
