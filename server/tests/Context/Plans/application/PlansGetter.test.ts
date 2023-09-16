import Plan from '../../../../src/Context/Plans/domain/Plan';
import PlansGetter from '../../../../src/Context/Plans/application/PlansGetter';

describe('PlansGetter', () => {
  it('should return the list of plans', async () => {
    const mockPlan = new Plan({
      id: 'prod~test',
      name: 'test plan',
      lessons: 4,
      price: 5000,
      mode: 'subscription',
    });
    const mockRepository = {
      get: jest.fn(async () => [mockPlan]),
      find: jest.fn(),
    };
    const plansGetter = new PlansGetter(mockRepository);
    const plans = await plansGetter.run();
    expect(plans).toEqual([mockPlan]);
  });
});
