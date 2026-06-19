export interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  duration: number; // in minutes
  icon: string; // lucide icon name
  highlights: string[];
  preparation?: string;
}

export interface Clinician {
  id: string;
  name: string;
  role: string;
  specialty: string;
  bio: string;
  imageUrl: string;
  availableDays: number[]; // 1 = Mon, 5 = Fri
  timeSlots: string[];
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  author: {
    name: string;
    role: string;
    avatarUrl: string;
  };
  date: string;
  category: string;
  readTime: string;
  content: string[]; // split by paragraphs or rich blocks
  imageUrl: string;
  tags: string[];
}

export interface Booking {
  id: string;
  reference: string;
  service: Service;
  clinician: Clinician;
  date: string; // YYYY-MM-DD
  time: string;
  patient: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    notes?: string;
  };
  status: 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
}
