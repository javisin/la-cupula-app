export default class Plan {
  readonly id: string;

  readonly weekLessons: number;

  readonly name: string;

  readonly price: number;

  readonly mode: 'subscription' | 'payment';

  constructor(props: {
    id: string;
    weekLessons: number;
    name: string;
    price: number;
    mode: 'subscription' | 'payment';
  }) {
    this.id = props.id;
    this.weekLessons = props.weekLessons;
    this.name = props.name;
    this.price = props.price;
    this.mode = props.mode;
  }
}

export interface PlanRepository {
  get(): Promise<Plan[]>;
  find(id: string): Promise<Plan | null>;
}
