enum TodoState {
  COMPlETED = "completed",
  INPROGRESS = "in-progress",
  TODO = "todo",
}

interface ITodo {
  id: string;
  title: string;
  description: string;
  state: string;
}

export default class Todo implements ITodo {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public state: string
  ) {}
}
