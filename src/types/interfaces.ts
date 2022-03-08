export interface iCart {
  items: { [key: string]: string | number }[];
  totalAmount: number;
  addItem: (item: any) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}
