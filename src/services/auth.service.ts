import axios, { AxiosError } from "axios";
import { tesloApi } from "../api/tesloApi";

export interface LoginResponse {
    id: string;
    email: string;
    fullName: string;
    isActive: boolean;
    roles: string[];
    token: string;
}

export class AuthService {
    static login = async (email: string, password: string): Promise<LoginResponse> => {
        try {
            const { data } = await tesloApi.post<LoginResponse>("/auth/login", { email, password })
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error(error.response?.data)
                throw new Error(error.response?.data)
            }
            throw new Error("Error desconocido")
        }
    }
    static checkStatus = async (): Promise<LoginResponse> => {
        try {
            const { data } = await tesloApi.get<LoginResponse>("/auth/check-status")
            console.log(data)
            return data;
        } catch (error) {
            throw new Error("Unauthorized")
        }
    }
    static infoPrivate = async (): Promise<unknown> => {
        try {
            const { data } = await tesloApi.get("/auth/private")
            return data;
        } catch (error) {
            throw new Error("Hubo un error ");

        }
    }
}
