export default class Booking {
  readonly id: number;

  readonly userId: number;

  readonly lessonId: number;

  readonly status: 'pending' | 'approved' | 'declined';

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
  save(booking: Booking): Promise<void>;
}
