export interface ToDoItem {
    id: string;
    title: string;
    description?: string;
    status: 'completed' | 'incomplete';
  }
  
  export interface NewToDoItem {
    title: string;
    description?: string;
    status: 'completed' | 'incomplete';
  }
  