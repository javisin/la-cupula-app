const DEFAULT_MAX_SEATS = 20;

export default class Lesson {
  static create(props: {
    startDate: Date;
    academyId: number;
    endDate: Date;
    type: string;
    maxSeats?: number;
    professor: { id: number; firstName: string; lastName: string; image: string };
  }) {
    return new Lesson({
      id: 1,
      academyId: props.academyId,
      startDate: props.startDate,
      endDate: props.endDate,
      type: props.type,
      maxSeats: props.maxSeats ?? DEFAULT_MAX_SEATS,
      bookedSeats: 0,
      professor: props.professor,
    });
  }

  readonly id: number;

  readonly academyId: number;

  startDate: Date;

  endDate: Date;

  type: string;

  professor: { id: number; firstName: string; lastName: string; image: string };

  maxSeats: number;

  bookedSeats: number;

  constructor(props: {
    id: number;
    academyId: number;
    startDate: Date;
    endDate: Date;
    type: string;
    maxSeats: number;
    bookedSeats: number;
    professor: { id: number; firstName: string; lastName: string; image: string };
  }) {
    this.id = props.id;
    this.academyId = props.academyId;
    this.startDate = props.startDate;
    this.endDate = props.endDate;
    this.type = props.type;
    this.professor = props.professor;
    this.bookedSeats = props.bookedSeats;
    this.maxSeats = props.maxSeats;
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

  incrementBookedSeats() {
    this.bookedSeats += 1;
  }
}

export interface GetLessonsFilter {
  date?: Date;
  academyId?: number;
}

export interface LessonRepository {
  get(filter?: GetLessonsFilter): Promise<Lesson[]>;
  find(id: number): Promise<Lesson | undefined>;
  create(lesson: Lesson): Promise<void>;
  update(lesson: Lesson): Promise<void>;
}
