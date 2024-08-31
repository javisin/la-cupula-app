export default class Lesson {
  readonly id: number;

  readonly startDate: Date;

  readonly endDate: Date;

  readonly type: string;

  readonly professorId: number;

  readonly professor?: { firstName: string; lastName: string; image: string };

  constructor(props: {
    id: number;
    startDate: Date;
    endDate: Date;
    type: string;
    professorId: number;
    professor?: { firstName: string; lastName: string; image: string };
  }) {
    this.id = props.id;
    this.startDate = props.startDate;
    this.endDate = props.endDate;
    this.type = props.type;
    this.professorId = props.professorId;
    this.professor = props.professor;
  }
}

export interface GetLessonsFilter {
  date?: Date;
}

export interface LessonRepository {
  get(filter?: GetLessonsFilter): Promise<Lesson[]>;
  save(lesson: Lesson): Promise<void>;
}
