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
