import { createContext, useContext, useReducer, ReactNode } from "react";

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'donor' | 'ngo' | 'volunteer';
  organization?: string;
  avatar?: string;
  joinDate: string;
}

export interface Donation {
  id: string;
  foodType: string;
  quantity: string;
  expiryDate: string;
  pickupLocation: string;
  description: string;
  status: 'pending' | 'matched' | 'picked-up' | 'delivered';
  donorId: string;
  ngoId?: string;
  volunteerId?: string;
  createdAt: string;
  matchedAt?: string;
}

export interface FoodRequest {
  id: string;
  foodType: string;
  quantity: string;
  urgency: 'low' | 'medium' | 'high';
  location: string;
  description: string;
  ngoId: string;
  status: 'open' | 'matched' | 'fulfilled';
  createdAt: string;
  donationId?: string;
}

export interface VolunteerTask {
  id: string;
  type: 'pickup' | 'delivery';
  donationId: string;
  volunteerId?: string;
  pickupLocation: string;
  deliveryLocation: string;
  status: 'available' | 'assigned' | 'in-progress' | 'completed';
  scheduledTime: string;
  estimatedDuration: number;
}

interface AppState {
  user: User | null;
  donations: Donation[];
  foodRequests: FoodRequest[];
  volunteerTasks: VolunteerTask[];
  notifications: Notification[];
  isLoading: boolean;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
  timestamp: string;
  read: boolean;
}

// Actions
type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'ADD_DONATION'; payload: Donation }
  | { type: 'UPDATE_DONATION'; payload: { id: string; updates: Partial<Donation> } }
  | { type: 'ADD_FOOD_REQUEST'; payload: FoodRequest }
  | { type: 'UPDATE_FOOD_REQUEST'; payload: { id: string; updates: Partial<FoodRequest> } }
  | { type: 'ADD_VOLUNTEER_TASK'; payload: VolunteerTask }
  | { type: 'UPDATE_VOLUNTEER_TASK'; payload: { id: string; updates: Partial<VolunteerTask> } }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'MATCH_DONATION_REQUEST'; payload: { donationId: string; requestId: string } };

// Initial state with sample data
const initialState: AppState = {
  user: {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "donor",
    organization: "Green Market",
    joinDate: "2024-01-01"
  },
  donations: [
    {
      id: "d1",
      foodType: "Fresh Vegetables",
      quantity: "15 kg",
      expiryDate: "2024-01-20",
      pickupLocation: "123 Main St, Downtown",
      description: "Assorted fresh vegetables from our daily surplus",
      status: "pending",
      donorId: "1",
      createdAt: "2024-01-15T10:00:00Z"
    },
    {
      id: "d2",
      foodType: "Bread & Pastries",
      quantity: "30 units",
      expiryDate: "2024-01-18",
      pickupLocation: "456 Oak Ave, City Center",
      description: "End-of-day bakery items",
      status: "delivered",
      donorId: "1",
      ngoId: "n1",
      volunteerId: "v1",
      createdAt: "2024-01-10T14:00:00Z",
      matchedAt: "2024-01-10T15:00:00Z"
    }
  ],
  foodRequests: [
    {
      id: "r1",
      foodType: "Vegetables",
      quantity: "10-20 kg",
      urgency: "medium",
      location: "Downtown Community Center",
      description: "Fresh vegetables for our daily meal program",
      ngoId: "n1",
      status: "open",
      createdAt: "2024-01-15T09:00:00Z"
    }
  ],
  volunteerTasks: [
    {
      id: "t1",
      type: "pickup",
      donationId: "d1",
      pickupLocation: "123 Main St, Downtown",
      deliveryLocation: "Downtown Community Center",
      status: "available",
      scheduledTime: "2024-01-16T14:00:00Z",
      estimatedDuration: 60
    }
  ],
  notifications: [
    {
      id: "n1",
      title: "New Food Request Match",
      message: "Your vegetable donation has been matched with Hope Kitchen!",
      type: "success",
      timestamp: "2024-01-15T10:30:00Z",
      read: false
    }
  ],
  isLoading: false
};

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    
    case 'ADD_DONATION':
      return {
        ...state,
        donations: [...state.donations, action.payload],
        notifications: [
          ...state.notifications,
          {
            id: Date.now().toString(),
            title: "Donation Posted",
            message: `Your ${action.payload.foodType} donation has been posted successfully!`,
            type: "success",
            timestamp: new Date().toISOString(),
            read: false
          }
        ]
      };
    
    case 'UPDATE_DONATION':
      return {
        ...state,
        donations: state.donations.map(d =>
          d.id === action.payload.id ? { ...d, ...action.payload.updates } : d
        )
      };
    
    case 'ADD_FOOD_REQUEST':
      return {
        ...state,
        foodRequests: [...state.foodRequests, action.payload]
      };
    
    case 'UPDATE_FOOD_REQUEST':
      return {
        ...state,
        foodRequests: state.foodRequests.map(r =>
          r.id === action.payload.id ? { ...r, ...action.payload.updates } : r
        )
      };
    
    case 'ADD_VOLUNTEER_TASK':
      return {
        ...state,
        volunteerTasks: [...state.volunteerTasks, action.payload]
      };
    
    case 'UPDATE_VOLUNTEER_TASK':
      return {
        ...state,
        volunteerTasks: state.volunteerTasks.map(t =>
          t.id === action.payload.id ? { ...t, ...action.payload.updates } : t
        )
      };
    
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [action.payload, ...state.notifications]
      };
    
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(n =>
          n.id === action.payload ? { ...n, read: true } : n
        )
      };
    
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'MATCH_DONATION_REQUEST':
      const { donationId, requestId } = action.payload;
      return {
        ...state,
        donations: state.donations.map(d =>
          d.id === donationId ? { ...d, status: 'matched' as const, matchedAt: new Date().toISOString() } : d
        ),
        foodRequests: state.foodRequests.map(r =>
          r.id === requestId ? { ...r, status: 'matched' as const, donationId } : r
        ),
        notifications: [
          {
            id: Date.now().toString(),
            title: "Perfect Match!",
            message: "A donation has been matched with your food request.",
            type: "success",
            timestamp: new Date().toISOString(),
            read: false
          },
          ...state.notifications
        ]
      };
    
    default:
      return state;
  }
}

// Context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

// Provider
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};