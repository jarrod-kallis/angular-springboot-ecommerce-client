export class Country {
  public id: number;
  public code: string;
  public name: string;
  public stateDescription: string;
  public zipCodeDescription: string;

  constructor(id: number, code: string, name: string, stateDescription: string, zipCodeDescription: string) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.stateDescription = stateDescription;
    this.zipCodeDescription = zipCodeDescription;
  }
}
