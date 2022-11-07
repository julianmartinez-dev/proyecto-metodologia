import accommodationRepository from '../../../../src/infrastructure/repositories/accommodation.repository';
import { Accommodation } from '../../../../src/domain/entities/accommodation.entity';
import CreateAccommodationHandler from '../../../../src/application/handlers/accommodation/create.accommodation.handler';
import { CreateAccommodationCommand } from '../../../../src/application/commands/accommodation/create.accommodation.command';

describe('Create Accommodation', () => {
  it('should create an accommodation', async () => {
    const accommodationMock = Accommodation.create('Hotel', 50);
    accommodationRepository.save = jest.fn().mockResolvedValueOnce(accommodationMock);
    const result = await CreateAccommodationHandler.execute(new CreateAccommodationCommand('10', 'Hotel', 50));
    //En el command se solicita ID, ¿retirarlo?
    expect(accommodationRepository.save).toBeCalled();
  });
});
