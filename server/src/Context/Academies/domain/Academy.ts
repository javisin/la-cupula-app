export class Academy {
  readonly id: number;

  readonly name: string;

  constructor(params: { id: number; name: string }) {
    this.id = params.id;
    this.name = params.name;
  }
}
