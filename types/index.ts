export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category_id: string;
  options: [
    {
      Label: string;
      Choices: [{ Label: string; Price: number }];
    }
  ];

  images: [string];
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
  menu_item_id: string;
  quantity: number;
  selected_options: [{ label: string; choice: string }];
  item: MenuItem;
}
