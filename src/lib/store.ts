import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { v4 as uuid } from 'uuid';
import { Column } from '@/components/kanban/board-column';
import { UniqueIdentifier } from '@dnd-kit/core';

export type Status = 'TODO' | 'IN_PROGRESS' | 'DONE';

const defaultCols = [
  {
    id: 'TODO' as const,
    title: 'Todo',
  },
] satisfies Column[];

export type ColumnId = (typeof defaultCols)[number]['id'];

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: Status;
};

const initialTasks: Task[] = [
  {
    id: 'task1',
    status: 'TODO',
    title: 'Project initiation and planning',
  },
  {
    id: 'task2',
    status: 'TODO',
    title: 'Gather requirements from stakeholders',
  },
];

// Atoms for state management
export const tasksAtom = atomWithStorage<Task[]>('tasks', initialTasks);
export const columnsAtom = atomWithStorage<Column[]>('columns', defaultCols);
export const draggedTaskAtom = atom<string | null>(null);

// Action atoms
export const addTaskAtom = atom(
  null,
  (get, set, { title, description }: { title: string; description?: string }) => {
    const tasks = get(tasksAtom);
    set(tasksAtom, [
      ...tasks,
      { id: uuid(), title, description, status: 'TODO' },
    ]);
  }
);

export const addColAtom = atom(null, (get, set, title: string) => {
  const columns = get(columnsAtom);
  set(columnsAtom, [
    ...columns,
    { title, id: columns.length ? title.toUpperCase() : 'TODO' },
  ]);
});

export const updateColAtom = atom(
  null,
  (get, set, { id, newName }: { id: UniqueIdentifier; newName: string }) => {
    const columns = get(columnsAtom);
    set(
      columnsAtom,
      columns.map((col) =>
        col.id === id ? { ...col, title: newName } : col
      )
    );
  }
);

export const dragTaskAtom = atom(null, (get, set, id: string | null) => {
  set(draggedTaskAtom, id);
});

export const removeTaskAtom = atom(null, (get, set, id: string) => {
  const tasks = get(tasksAtom);
  set(tasksAtom, tasks.filter((task) => task.id !== id));
});

export const removeColAtom = atom(null, (get, set, id: UniqueIdentifier) => {
  const columns = get(columnsAtom);
  set(columnsAtom, columns.filter((col) => col.id !== id));
});

export const setTasksAtom = atom(null, (get, set, updatedTasks: Task[]) => {
  set(tasksAtom, updatedTasks);
});

export const setColsAtom = atom(null, (get, set, updatedCols: Column[]) => {
  set(columnsAtom, updatedCols);
});
