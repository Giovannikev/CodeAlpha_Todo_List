import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // URL de ton backend

// Récupérer toutes les tâches
export const getTasks = async () => {
  const response = await axios.get(`${API_BASE_URL}/tasks`);
  return response.data;
};

// Ajouter une tâche
interface Task {
      id?: number;
      title: string;
      completed: boolean;
}

interface TaskResponse {
      success: boolean;
      data: Task;
}

export const addTask = async (task: Task): Promise<TaskResponse> => {
      const response = await axios.post(`${API_BASE_URL}/tasks`, task);
      return response.data;
};

// Mettre à jour une tâche
interface UpdateTaskResponse {
      success: boolean;
      data: Task;
}

export const updateTask = async (id: number, updatedTask: Task): Promise<UpdateTaskResponse> => {
      const response = await axios.put(`${API_BASE_URL}/tasks/${id}`, updatedTask);
      return response.data;
};

// Supprimer une tâche
interface DeleteTaskResponse {
      success: boolean;
      data: null;
}

export const deleteTask = async (id: number): Promise<DeleteTaskResponse> => {
      const response = await axios.delete(`${API_BASE_URL}/tasks/${id}`);
      return response.data;
};
