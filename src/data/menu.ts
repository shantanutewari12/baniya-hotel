export type Category = "Breakfast" | "Lunch" | "Dinner" | "Snacks" | "Beverages" | "Desserts";

export const CATEGORIES: Category[] = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Snacks",
  "Beverages",
  "Desserts",
];

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  veg: boolean;
  image: string;
}

export const MENU: MenuItem[] = [
  // Breakfast
  { id: "b1", name: "Aloo Paratha", description: "Stuffed potato flatbread served with curd, pickle & white butter", price: 180, category: "Breakfast", veg: true, image: "https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?w=600&auto=format&fit=crop" },
  { id: "b2", name: "Masala Dosa", description: "Crispy rice crepe with spiced potato filling, sambar & chutney", price: 220, category: "Breakfast", veg: true, image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600&auto=format&fit=crop" },
  { id: "b3", name: "Poha", description: "Flattened rice tossed with onions, peanuts & curry leaves", price: 140, category: "Breakfast", veg: true, image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=600&auto=format&fit=crop" },
  { id: "b4", name: "Anda Bhurji & Toast", description: "Spiced scrambled eggs with butter toast", price: 200, category: "Breakfast", veg: false, image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&auto=format&fit=crop" },

  // Lunch
  { id: "l1", name: "Baniya Special Thali", description: "Dal, sabzi, rice, 4 rotis, salad, raita & sweet", price: 320, category: "Lunch", veg: true, image: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=600&auto=format&fit=crop" },
  { id: "l2", name: "Rajma Chawal", description: "Slow-cooked kidney beans with steamed basmati rice", price: 240, category: "Lunch", veg: true, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop" },
  { id: "l3", name: "Chicken Curry & Rice", description: "Home-style chicken curry with jeera rice", price: 360, category: "Lunch", veg: false, image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&auto=format&fit=crop" },
  { id: "l4", name: "Paneer Butter Masala", description: "Cottage cheese in rich tomato cashew gravy with butter naan", price: 340, category: "Lunch", veg: true, image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&auto=format&fit=crop" },

  // Dinner
  { id: "d1", name: "Dal Makhani", description: "Black lentils simmered overnight with cream & butter", price: 280, category: "Dinner", veg: true, image: "https://images.unsplash.com/photo-1626100134240-9bc8b8f78b8e?w=600&auto=format&fit=crop" },
  { id: "d2", name: "Butter Chicken", description: "Tandoor-grilled chicken in silky tomato butter gravy", price: 420, category: "Dinner", veg: false, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&auto=format&fit=crop" },
  { id: "d3", name: "Veg Biryani", description: "Long-grain basmati layered with vegetables & saffron", price: 280, category: "Dinner", veg: true, image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&auto=format&fit=crop" },
  { id: "d4", name: "Mutton Biryani", description: "Slow-cooked Hyderabadi-style mutton biryani with raita", price: 460, category: "Dinner", veg: false, image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=600&auto=format&fit=crop" },

  // Snacks
  { id: "s1", name: "Samosa (2 pcs)", description: "Crisp pastry stuffed with spiced potato & peas", price: 60, category: "Snacks", veg: true, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop" },
  { id: "s2", name: "Paneer Tikka", description: "Char-grilled marinated cottage cheese skewers", price: 280, category: "Snacks", veg: true, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&auto=format&fit=crop" },
  { id: "s3", name: "Chicken 65", description: "South Indian style spicy fried chicken bites", price: 320, category: "Snacks", veg: false, image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=600&auto=format&fit=crop" },
  { id: "s4", name: "Veg Pakora", description: "Mixed vegetable fritters with green chutney", price: 140, category: "Snacks", veg: true, image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&auto=format&fit=crop" },

  // Beverages
  { id: "v1", name: "Masala Chai", description: "Brewed black tea with milk, cardamom & ginger", price: 50, category: "Beverages", veg: true, image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=600&auto=format&fit=crop" },
  { id: "v2", name: "Filter Coffee", description: "Strong South Indian filter decoction with milk", price: 70, category: "Beverages", veg: true, image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&auto=format&fit=crop" },
  { id: "v3", name: "Sweet Lassi", description: "Chilled creamy yogurt drink with rose & cardamom", price: 90, category: "Beverages", veg: true, image: "https://images.unsplash.com/photo-1626202378127-fd5f4a25b6db?w=600&auto=format&fit=crop" },
  { id: "v4", name: "Fresh Lime Soda", description: "Sweet, salt or mixed — freshly squeezed", price: 80, category: "Beverages", veg: true, image: "https://images.unsplash.com/photo-1556881286-fc6915169721?w=600&auto=format&fit=crop" },

  // Desserts
  { id: "ds1", name: "Gulab Jamun (2 pcs)", description: "Warm milk dumplings soaked in rose-cardamom syrup", price: 120, category: "Desserts", veg: true, image: "https://images.unsplash.com/photo-1601303516527-8b50ee0ef4a5?w=600&auto=format&fit=crop" },
  { id: "ds2", name: "Rasmalai", description: "Soft paneer discs in saffron-pistachio milk", price: 160, category: "Desserts", veg: true, image: "https://images.unsplash.com/photo-1606471191009-63994c53433b?w=600&auto=format&fit=crop" },
  { id: "ds3", name: "Gajar Halwa", description: "Slow-cooked carrot pudding with ghee & dry fruits", price: 180, category: "Desserts", veg: true, image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&auto=format&fit=crop" },
  { id: "ds4", name: "Kulfi Falooda", description: "Saffron kulfi with vermicelli & rose syrup", price: 150, category: "Desserts", veg: true, image: "https://images.unsplash.com/photo-1568051243851-f9b136146e97?w=600&auto=format&fit=crop" },
];

export const HOTEL = {
  name: "Baniya Hotel",
  tagline: "Authentic flavours, served to your room",
  phone: "+919634631670",
  whatsapp: "919634631670",
};