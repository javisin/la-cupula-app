export type BookingStatus = 'pending' | 'approved' | 'declined';

export default class Booking {
  readonly id: number;

  readonly userId: number;

  readonly lessonId: number;

  readonly status: BookingStatus;

  constructor(props: {
    id: number;
    userId: number;
    lessonId: number;
    status: 'pending' | 'approved' | 'declined';
  }) {
    this.id = props.id;
    this.userId = props.userId;
    this.lessonId = props.lessonId;
    this.status = props.status;
  }
}

export interface BookingRepository {
  find(id: number): Promise<Booking | null>;
  save(booking: Booking): Promise<void>;
  update(id: number, booking: Booking): Promise<void>;
}
