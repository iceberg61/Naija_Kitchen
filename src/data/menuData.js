// Shared menu data — imported by MenuPage, CheckoutPage, and any future page that needs it
const menuData = [
  // Soups
  { id: 1,  category: "Soups",  name: "Egusi Soup",       desc: "Rich melon seed soup with assorted meat and stockfish.",             price: 3500, rating: 4.9, time: "20 min", img: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400&q=80" },
  { id: 2,  category: "Soups",  name: "Banga Soup",        desc: "Palm fruit soup slow-cooked with fresh catfish and scent leaf.",     price: 3800, rating: 4.7, time: "25 min", img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80" },
  { id: 3,  category: "Soups",  name: "Ofe Onugbu",        desc: "Bitter leaf soup with ofe akwu and assorted protein.",               price: 3200, rating: 4.6, time: "20 min", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80" },
  { id: 4,  category: "Soups",  name: "Pepper Soup",       desc: "Spicy catfish pepper soup with utazi and uziza leaves.",             price: 2800, rating: 4.8, time: "15 min", img: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&q=80" },
  // Rice
  { id: 5,  category: "Rice",   name: "Jollof Rice",       desc: "Party-style jollof with smoky tomato base and fried plantain.",      price: 2500, rating: 5.0, time: "10 min", img: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80" },
  { id: 6,  category: "Rice",   name: "Fried Rice",        desc: "Nigerian fried rice with mixed veggies, liver and shrimps.",         price: 2500, rating: 4.8, time: "10 min", img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80" },
  { id: 7,  category: "Rice",   name: "Ofada Rice & Stew", desc: "Local ofada rice served with rich ayamase designer stew.",           price: 3000, rating: 4.7, time: "15 min", img: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=80" },
  { id: 8,  category: "Rice",   name: "White Rice & Stew", desc: "Fluffy long-grain rice with rich tomato stew and chicken.",          price: 2200, rating: 4.5, time: "10 min", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80" },
  // Snacks
  { id: 9,  category: "Snacks", name: "Puff Puff",         desc: "Soft, golden, deep-fried dough balls — lightly sweetened.",          price: 800,  rating: 4.9, time: "5 min",  img: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&q=80" },
  { id: 10, category: "Snacks", name: "Akara",             desc: "Crispy black-eyed pea fritters, perfect with pap or bread.",         price: 700,  rating: 4.6, time: "5 min",  img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80" },
  { id: 11, category: "Snacks", name: "Suya Skewers",      desc: "Grilled spiced beef skewers with yaji and sliced onions.",           price: 1500, rating: 4.9, time: "10 min", img: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&q=80" },
  { id: 12, category: "Snacks", name: "Fried Plantain",    desc: "Sweet ripe plantain, golden-fried to perfection.",                   price: 600,  rating: 4.7, time: "5 min",  img: "https://images.unsplash.com/photo-1587334207407-99e44e5f5e72?w=400&q=80" },
  // Drinks
  { id: 13, category: "Drinks", name: "Zobo Drink",        desc: "Chilled hibiscus drink infused with ginger and pineapple.",          price: 500,  rating: 4.8, time: "2 min",  img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&q=80" },
  { id: 14, category: "Drinks", name: "Kunu Aya",          desc: "Tigernut milk blended with dates and coconut — naturally sweet.",    price: 600,  rating: 4.6, time: "2 min",  img: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80" },
  { id: 15, category: "Drinks", name: "Chapman",           desc: "Classic Nigerian Chapman mocktail with Fanta, Sprite and bitters.",  price: 700,  rating: 4.7, time: "2 min",  img: "https://images.unsplash.com/photo-1437418747212-8d9709afab22?w=400&q=80" },
  { id: 16, category: "Drinks", name: "Palm Wine",         desc: "Fresh tapped palm wine, naturally fermented and lightly sweet.",     price: 800,  rating: 4.5, time: "2 min",  img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=80" },
];

export default menuData;
