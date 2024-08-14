export interface Part {
  _id: string;
  name: string;
  price: string;
  imageUrl?: string;
  owner?: string;
  location: string;
  description: string;
  createdAt?: Date;
  carMake: string;
  partNumber: string;
  sold?: boolean;
}
