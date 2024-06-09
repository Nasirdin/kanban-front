import axios, { type AxiosResponse } from "axios";

const API_URL = "https://kanban-o-cff86d1683e5.herokuapp.com/api";

export interface CreateUserRequest {
  username: string;
  login: string;
  password: string;
}

export interface Response {
  success: boolean;
  message?: string;
}

export interface TaskResponse {
  id: number;
  title: string;
  content: string;
  authorId: number;
  status: string;
  createdat: string;
}

export interface LoginRequest {
  login: string;
  password: string;
}

export interface TaskRequest {
  title: string;
  description: string;
  authorId: number;
  status: string;
}

export const createUser = async (
  user: CreateUserRequest
): Promise<Response> => {
  try {
    const response: AxiosResponse<Response> = await axios.post(
      `${API_URL}/user`,
      user
    );

    if (response.status === 200) {
      if (response.data.success) {
        return { success: true };
      } else {
        return {
          success: false,
          message: "Пользователь с таким именем уже существует",
        };
      }
    } else {
      return { success: false, message: "Произошла ошибка при регистрации" };
    }
  } catch (err) {
    return { success: false, message: "Произошла ошибка при регистрации" };
  }
};

export const userLogin = async (user: LoginRequest): Promise<Response> => {
  try {
    const response: AxiosResponse<Response> = await axios.post(
      `${API_URL}/login`,
      user
    );

    if (response.status === 200) {
      return { success: true };
    } else {
      return { success: false, message: "Произошла ошибка при входе" };
    }
  } catch (err) {
    return { success: false, message: "Произошла ошибка при входе" };
  }
};

export const createTask = async (task: TaskRequest): Promise<Response> => {
  try {
    const response: AxiosResponse<Response> = await axios.post(
      `${API_URL}/task`,
      task
    );
    if (response.status === 200) {
      return { success: true };
    }
    return { success: false, message: "Произошла ошибка при создании задачи" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Произошла ошибка при создании задачи" };
  }
};

export const getAllTasks = async (): Promise<TaskResponse[]> => {
  try {
    const response: AxiosResponse<TaskResponse[]> = await axios.get(
      `${API_URL}/task`
    );
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const updateTaskStatus = async (
  newStatus: string,
  id: number
): Promise<Response> => {
  try {
    const response: AxiosResponse<Response> = await axios.put(
      `${API_URL}/task/${id}`,
      { status: newStatus }
    );
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
