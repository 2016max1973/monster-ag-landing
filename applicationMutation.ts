/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/lib/axiosConfig';

// Reusable interface for application data
export interface ApplicationData {
    firstName: string;
    lastName: string;
    userEmail: string;
    dateOfBirth: string;
    employeeStreet: string;
    employeeZip: string;
    employeeCity: string;
    employerName: string;
    employerEmail: string;
    employerStreet: string;
    employerZip: string;
    employerCity: string;
    preferredDate: string;
    phoneNumber: string;
    message: string;
    consent: boolean;
}

// API response type
export interface ResponseType<T = any> {
    success: boolean;
    message: string;
    data?: T;
    errors?: { field: string; errors: string[] }[];
}

// Function to submit the application
export async function submitApplication(data: ApplicationData): Promise<ResponseType> {
    const response = await axiosInstance.post<ResponseType>('/api/applications', data);
    return response.data;
}

// React Query mutation hook
export function useSubmitApplication() {
    return useMutation<ResponseType, unknown, ApplicationData>({
        mutationFn: submitApplication,
    });
} 