export interface Gira {
  id: number;
  title: string;
  description: string;
  imageGira: string;
  dateGira: string;
  isPublic: boolean;
  confirmGira: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GirasResponse {
  success: boolean;
  status: number;
  message: string;
  data: Gira[];
}
