export default class User {
  readonly id: number;

  readonly firstName: string;

  readonly lastName: string;

  readonly nickName: string;

  readonly email: string;

  readonly belt: string;

  readonly stripes: number;

  readonly startDate: Date;

  readonly password: string;

  readonly image: string;

  readonly instructor: boolean;

  planId: string | null;

  planBookings: number;

  readonly customerId: string;

  constructor(props: {
    id: number;
    firstName: string;
    lastName: string;
    nickName: string;
    email: string;
    belt: string;
    stripes: number;
    startDate: Date;
    password: string;
    image: string;
    instructor: boolean;
    planId: string | null;
    customerId: string;
    planBookings: number;
  }) {
    this.id = props.id;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.nickName = props.nickName;
    this.email = props.email;
    this.belt = props.belt;
    this.stripes = props.stripes;
    this.password = props.password;
    this.image = props.image;
    this.instructor = props.instructor;
    this.planId = props.planId;
    this.customerId = props.customerId;
    this.startDate = props.startDate;
    this.planBookings = props.planBookings;
  }
}

export interface UserRepository {
  find(id: number): Promise<User | null>;
  update(user: User): Promise<void>;
}
