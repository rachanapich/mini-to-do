import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { NewToDoItem, ToDoItem } from './types';

const todoCollectionRef = collection(db, 'todos');

export const subscribeToTodos = (onTodoUpdate: (todos: ToDoItem[]) => void) => {
  return onSnapshot(todoCollectionRef, (snapshot) => {
    const todos = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ToDoItem[];

    onTodoUpdate(todos);
  });
};

export const addTodo = async (todo: NewToDoItem): Promise<ToDoItem> => {
  const docRef = await addDoc(todoCollectionRef, todo);
  return { id: docRef.id, ...todo };
};

export const updateTodo = async (id: string, updatedFields: Partial<ToDoItem>) => {
  const todoDoc = doc(db, 'todos', id);
  await updateDoc(todoDoc, updatedFields);
};


export const deleteTodo = async (id: string) => {
  const todoDoc = doc(db, 'todos', id);
  await deleteDoc(todoDoc);
};
