export interface Choices {
  label: string;
  price: string;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category_id: string;
  options: [
    {
      label: string;
      choices: Choices[];
    }
  ];

  images: string[];
  rating: number;
  ratingCount: number;
  createdAt: string;
}

export interface UserCart {
  id: string;
  user_id: string;
  items: CartItems[];
}

export interface CartItems {
  id: string;
  menu_item_id: string;
  quantity: number;
  selectedOptions: Choices[];
  item?: MenuItem;
}
