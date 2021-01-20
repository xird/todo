import * as fs from 'fs';
import * as path from 'path';
import { Note, Status } from './types';

const dataPath = path.join(__dirname, '../data/data.json');
const idPath = path.join(__dirname, '../data/last-id');

export default class Todo {
  private data: Array<Note> = [];
  private lastId: number;

  constructor() {
    const json = fs.readFileSync(dataPath, { encoding: 'utf8' });
    this.data = JSON.parse(json);

    this.lastId = parseInt(fs.readFileSync(idPath, { encoding: 'utf8' }));
  };

  list() {
    if (!this.data.length) {
      console.log('No notes. Create a note with "todo new My New Note".');
    } else {
      console.table(this.data);
    }
  };

  newNote(content: string): Note {
    const id = this.lastId + 1;
    const newNote = {
      id,
      content,
      status: Status.Todo,
    };

    this.data.push(newNote);
    this.lastId = id;

    this.writeData();
    fs.writeFileSync(idPath, this.lastId.toString());

    return newNote;
  }

  done(id: number): boolean {
    try {
      const newData = this.data.filter((note) => { return note.id !== id });
      const [ doneNote ] = this.data.filter((note) => { return note.id === id });

      doneNote.status = Status.Done;

      newData.push(doneNote);
      this.data = newData;
      this.writeData();

      return true;
    } catch (err) {
      return false;
    }
  }

  deleteNote(id: number): boolean {
    try {
      const newData = this.data.filter((note) => { return note.id !== id });
      this.data = newData;
      this.writeData();

      return true;
    } catch (err) {
      return false;
    }
  }

  private writeData() {
    fs.writeFileSync(dataPath, JSON.stringify(this.data));
  }
};
