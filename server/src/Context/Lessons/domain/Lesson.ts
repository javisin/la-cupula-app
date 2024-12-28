export default class Lesson {
  readonly id: number;

  startDate: Date;

  endDate: Date;

  type: string;

  professor: { id: number; firstName: string; lastName: string; image: string };

  constructor(props: {
    id: number;
    startDate: Date;
    endDate: Date;
    type: string;
    professor: { id: number; firstName: string; lastName: string; image: string };
  }) {
    this.id = props.id;
    this.startDate = props.startDate;
    this.endDate = props.endDate;
    this.type = props.type;
    this.professor = props.professor;
  }

  changeProfessorId(id: number) {
    this.professor.id = id;
  }

  changeStartDate(date: Date) {
    this.startDate = date;
  }

  changeEndDate(date: Date) {
    this.endDate = date;
  }

  changeType(type: string) {
    this.type = type;
  }
}

export interface GetLessonsFilter {
  date?: Date;
}

export interface LessonRepository {
  get(filter?: GetLessonsFilter): Promise<Lesson[]>;
  find(id: number): Promise<Lesson | undefined>;
  create(lesson: Lesson): Promise<void>;
  update(lesson: Lesson): Promise<void>;
}
