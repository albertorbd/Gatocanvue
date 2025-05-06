
export interface CartItem {
    id: number;
    productId: number;
    quantity: number;
    product: {
      id: number;
      name: string;
      description: string;
      price: number;
      category: string;
      brand: string;
      stock: number;
      imageUrl: string;
    };
  }
  
  
  export interface Cart {
    id: number;
    userId: number;
    items: CartItem[];
    dateCreated: string; 
  }
  
  
  export interface CartAddDto {
    productId: number;
    quantity: number;
  }
  
  export interface CartUpdateDto {
    productId: number;
    quantity: number;
  }
  