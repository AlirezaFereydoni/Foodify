export interface iCart {
  items: itemType[];
  totalAmount: number;
  addItem: (item: itemType) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}

export interface itemType {
  id: number;
  name: string;
  price: number;
  amount: number;
}

export interface iConfirm {
  name: string;
  street: string;
  city: string;
  postalCode: string;
}
