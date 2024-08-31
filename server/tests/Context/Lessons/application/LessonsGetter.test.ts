import LessonsGetter from '../../../../src/Context/Lessons/application/LessonsGetter';
import Lesson from '../../../../src/Context/Lessons/domain/Lesson';

describe('LessonsGetter', () => {
  it('should return the list of lessons', async () => {
    const mockLesson = new Lesson({
      id: 1,
      startDate: new Date(),
      endDate: new Date(),
      type: 'test',
      professorId: 1,
    });
    const mockRepository = {
      get: jest.fn(async () => [mockLesson]),
      save: jest.fn(async () => {}),
    };
    const lessonsGetter = new LessonsGetter(mockRepository);
    const lessons = await lessonsGetter.run({});
    expect(lessons).toEqual([mockLesson]);
  });
});
