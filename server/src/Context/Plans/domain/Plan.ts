export default class Plan {
  readonly id: string;

  readonly weekLessons: number;

  readonly name: string;

  readonly price: number;

  constructor(props: { id: string; weekLessons: number; name: string; price: number }) {
    this.id = props.id;
    this.weekLessons = props.weekLessons;
    this.name = props.name;
    this.price = props.price;
  }
}

export interface PlanRepository {
  get(): Promise<Plan[]>;
}
