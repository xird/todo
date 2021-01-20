import Todo from './Todo';
import { Note } from './types';

const todo = new Todo();

/**
 * A simple TODO-app.
 *
 */

const usage = () => {
  console.error('Usage: todo [list] [new NEW_NOTE_CONTENT] [done NOTE_ID] delete [NOTE_ID]');
};

if (typeof process.argv[2] === 'undefined') {
  usage();
  process.exit(1);
}

let id: string;

switch (process.argv[2]) {
  case 'new':
    if (typeof process.argv[3] === 'undefined') {
      console.error('Missing content for new note');
      usage();
      process.exit(1);
    }

    let content = JSON.parse(JSON.stringify(process.argv));
    content = content.slice(3);
    content = content.join(' ');

    try {
      const newNote = todo.newNote(content);
      console.log(`Created note ${newNote.id} "${newNote.content}"`);
    } catch (err) {
      console.error('Error creating note');
    }

    break;

  case 'list':
    todo.list();
    break;

  case 'done':
    id = process.argv[3] ;

    if (typeof id === 'undefined') {
      console.error('Missing id for note to mark done');
      usage();
      process.exit(1);
    }

    if (todo.done(parseInt(id))) {
      console.log(`Marked task ${id} done.`);
    } else {
      console.error('Error marking task done');
    }

    break;

  case 'delete':
    id = process.argv[3] ;

    if (typeof id === 'undefined') {
      console.error('Missing id for note to delete');
      usage();
      process.exit(1);
    }

    if (todo.deleteNote(parseInt(id))) {
      console.log(`Deleted task ${id}.`);
    } else {
      console.error('Error deleting task');
    }

    break;

  default:
    console.error(`Unknown command "${process.argv[2]}"`);
    usage();
    process.exit(1);
}
