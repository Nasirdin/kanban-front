import axios from "axios";
import type { AxiosResponse } from "axios";

// const API_URL = "http://localhost:8080/api";
const API_URL = "https://kanban-o-335926ee38b9.herokuapp.com/api";

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
  authorid: number;
  status: string;
  createdat: string;
}

export interface LoginRequest {
  login: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  accessToken: string;
  username: string;
  userId: number;
}
export interface UserResponse {
  username: string;
}

export interface TaskRequest {
  title: string;
  content: string;
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

    if (response.statusText !== "OK") {
      return {
        success: false,
        message: response.data.message,
      };
    }
    return {
      success: true,
      message: response.data.message,
    };
  } catch (err) {
    return { success: false, message: "Произошла ошибка при регистрации" };
  }
};

export const userLogin = async (user: LoginRequest): Promise<Response> => {
  try {
    const response: AxiosResponse<LoginResponse> = await axios.post(
      `${API_URL}/user/login`,
      user
    );
    if (response.status === 200) {
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("userId", JSON.stringify(response.data.userId));
      return { success: true };
    } else {
      return { success: false, message: "Произошла ошибка при входе" };
    }
  } catch (err) {
    return { success: false, message: "Произошла ошибка при входе" };
  }
};

export const getUserById = async (
  userId: number
): Promise<UserResponse | null> => {
  try {
    const response: AxiosResponse<UserResponse> = await axios.get(
      `${API_URL}/user/${userId}`
    );
    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Ошибка при получении пользователя:", error);
    return null
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
export const deleteTask = async (id: number): Promise<Response> => {
  try {
    const response: AxiosResponse<Response> = await axios.delete(
      `${API_URL}/task/${id}`
    );
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
