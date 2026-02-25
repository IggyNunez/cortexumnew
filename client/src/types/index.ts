export interface Lead {
  name: string;
  email: string;
  company: string;
  phone: string;
  message?: string;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
}

export interface Benefit {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  text: string;
  name: string;
  position: string;
  company: string;
  image: string;
}

export interface Agency {
  id: string;
  name: string;
}
