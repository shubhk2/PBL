const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface LoginRequest {
  username: string; // Backend expects email in the 'username' field
  password: string;
}

export interface LoginResponse {
  success: boolean;
  access_token: string;
  token_type: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  phone?: string;
  profession?: string;
  preferred_language?: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  user: {
    id: string;
    username: string;
    email: string;
    phone: string;
    profession: string | null;
    preferred_language: string;
    created_at: string;
  };
}

export interface ProfileResponse {
  success: boolean;
  username: string;
  fullName: string;
  email: string;
  contact: string;
  language: string;
  profession: string;
  coursesGenerated: number;
  coursesCompleted: number;
  quizzesAttempted: number;
}

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  // Convert to FormData as the backend expects OAuth2 password flow
  const formData = new FormData();
  formData.append('username', credentials.username); // Backend expects email in username field
  formData.append('password', credentials.password);
  
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Login failed');
  }

  return response.json();
};

export const register = async (userData: RegisterRequest): Promise<RegisterResponse> => {
  // Make sure all required fields are present
  const payload = {
    username: userData.username,
    email: userData.email,
    password: userData.password,
    phone: userData.phone || "0000000000",
    profession: userData.profession || "",
    preferred_language: userData.preferred_language || "en"
  };

  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Registration failed');
  }

  return response.json();
};

export const getProfile = async (token: string): Promise<ProfileResponse> => {
  const response = await fetch(`${API_URL}/users/profile`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to fetch profile');
  }

  return response.json();
};
