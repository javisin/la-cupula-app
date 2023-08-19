export default class Lesson {
  readonly id: number;

  readonly startDate: Date;

  readonly endDate: Date;

  readonly type: string;

  constructor(props: { id: number; startDate: Date; endDate: Date; type: string }) {
    this.id = props.id;
    this.startDate = props.startDate;
    this.endDate = props.endDate;
    this.type = props.type;
  }
}

export interface GetLessonsFilter {
  date?: Date;
}

export interface LessonRepository {
  get(filter?: GetLessonsFilter): Promise<Lesson[]>;
}
