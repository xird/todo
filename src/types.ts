export type Note = {
  id: number;
  status: Status;
  content: string;
}

export enum Status {
  Todo = "TODO",
  Done = "DONE",
}
