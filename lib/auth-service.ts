// Mock user database
interface User {
  id: string;
  username: string;
  password: string;
  name: string;
  photo: string;
  role: 'admin' | 'member';
}

const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123', // In a real app, never store plain text passwords
    name: 'Administrador',
    photo: '/placeholder-user.jpg',
    role: 'admin'
  },
  {
    id: '2',
    username: 'tunomember',
    password: 'tuno123',
    name: 'João Tuno',
    photo: '/placeholder-user.jpg',
    role: 'member'
  },
];

export interface AuthUser {
  id: string;
  username: string;
  name: string;
  photo: string;
  role: 'admin' | 'member';
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  user: AuthUser | null;
  error?: string;
}

// Mock login function that simulates API request
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const user = mockUsers.find(
    u => u.username === credentials.username && u.password === credentials.password
  );
  
  if (!user) {
    return { user: null, error: 'Credenciais inválidas' };
  }
  
  // Don't return the password
  const { password, ...authUser } = user;
  return { user: authUser as AuthUser };
};

// Mock logout function
export const logout = async (): Promise<void> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  // In a real app, this would make an API call to invalidate the session
  return;
};

// Function to check if the user is authenticated
export const checkAuth = async (): Promise<AuthUser | null> => {
  // In a real app, this would verify the token with the server
  const storedUser = localStorage.getItem('teup_user');
  if (!storedUser) return null;
  
  try {
    return JSON.parse(storedUser) as AuthUser;
  } catch {
    return null;
  }
};