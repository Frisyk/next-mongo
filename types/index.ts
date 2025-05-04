export interface Bab {
  _id: string;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface Material {
  _id: string;
  title: string;
  slug: string;
  content: string;
  babId: string;
  bab?: Bab;
  createdAt: string;
  updatedAt: string;
  status: string;
  thumbnail: string;
} 