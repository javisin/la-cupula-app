import Plan from '../../../../src/Context/Plans/domain/Plan';
import PlansGetter from '../../../../src/Context/Plans/application/PlansGetter';

describe('PlansGetter', () => {
  it('should return the list of plans', async () => {
    const mockPlan = new Plan({
      id: 'prod~test',
      name: 'test plan',
      weekLessons: 4,
      price: 5000,
    });
    const mockRepository = {
      get: jest.fn(async () => [mockPlan]),
    };
    const plansGetter = new PlansGetter(mockRepository);
    const plans = await plansGetter.run();
    expect(plans).toEqual([mockPlan]);
  });
});
