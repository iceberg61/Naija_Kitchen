// Shared menu data — imported by MenuPage, CheckoutPage, and any future page that needs it
const menuData = [
  // Soups
  { id: 1,  category: "Soups",  name: "Egusi Soup",       desc: "Rich melon seed soup with assorted meat and stockfish.",             price: 3500, rating: 4.9, time: "20 min", img: "https://allnigerianfoods.com/wp-content/uploads/egusi_soup-1.jpg" },
  { id: 2,  category: "Soups",  name: "Banga Soup",        desc: "Palm fruit soup slow-cooked with fresh catfish and scent leaf.",     price: 3800, rating: 4.7, time: "25 min", img: "https://www.allnigerianrecipes.com/wp-content/uploads/2019/03/banga-soup.jpg" },
  { id: 3,  category: "Soups",  name: "Ofe Onugbu",        desc: "Bitter leaf soup with ofe akwu and assorted protein.",               price: 3200, rating: 4.6, time: "20 min", img: "https://www.myactivekitchen.com/wp-content/uploads/2019/12/bitter-leaf-soup-ofe-onugbu-recipe-img-1.jpg" },
  { id: 4,  category: "Soups",  name: "Pepper Soup",       desc: "Spicy catfish pepper soup with utazi and uziza leaves.",             price: 2800, rating: 4.8, time: "15 min", img: "https://allnigerianfoods.com/wp-content/uploads/pepper-soup.jpg" },
  // Rice
  { id: 5,  category: "Rice",   name: "Jollof Rice",       desc: "Party-style jollof with smoky tomato base and fried plantain.",      price: 2500, rating: 5.0, time: "10 min", img: "https://images.pexels.com/photos/17952746/pexels-photo-17952746.jpeg" },
  { id: 6,  category: "Rice",   name: "Fried Rice",        desc: "Nigerian fried rice with mixed veggies, liver and shrimps.",         price: 2500, rating: 4.8, time: "10 min", img: "https://images.pexels.com/photos/12913643/pexels-photo-12913643.jpeg" },
  { id: 7,  category: "Rice",   name: "Ofada Rice & Stew", desc: "Local ofada rice served with rich ayamase designer stew.",           price: 3000, rating: 4.7, time: "15 min", img: "https://www.myactivekitchen.com/wp-content/uploads/2016/12/ofada-stew-recipe-image_10.jpg" },
  { id: 8,  category: "Rice",   name: "White Rice & Stew", desc: "Fluffy long-grain rice with rich tomato stew and chicken.",          price: 2200, rating: 4.5, time: "10 min", img: "https://images.pexels.com/photos/5333327/pexels-photo-5333327.jpeg" },
  // Snacks
  { id: 9,  category: "Snacks", name: "Puff Puff",         desc: "Soft, golden, deep-fried dough balls — lightly sweetened.",          price: 800,  rating: 4.9, time: "5 min",  img: "https://images.pexels.com/photos/19863266/pexels-photo-19863266.jpeg" },
  { id: 10, category: "Snacks", name: "Akara",             desc: "Crispy black-eyed pea fritters, perfect with pap or bread.",         price: 700,  rating: 4.6, time: "5 min",  img: "https://images.pexels.com/photos/37624177/pexels-photo-37624177.jpeg" },
  { id: 11, category: "Snacks", name: "Suya Skewers",      desc: "Grilled spiced beef skewers with yaji and sliced onions.",           price: 1500, rating: 4.9, time: "10 min", img: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&q=80" },
  { id: 12, category: "Snacks", name: "Fried Plantain",    desc: "Sweet ripe plantain, golden-fried to perfection.",                   price: 600,  rating: 4.7, time: "5 min",  img: "https://images.pexels.com/photos/37324427/pexels-photo-37324427.jpeg" },
  // Drinks
  { id: 13, category: "Drinks", name: "Zobo Drink",        desc: "Chilled hibiscus drink infused with ginger and pineapple.",          price: 500,  rating: 4.8, time: "2 min",  img: "https://images.pexels.com/photos/36630822/pexels-photo-36630822.jpeg" },
  { id: 14, category: "Drinks", name: "Kunu Aya",          desc: "Tigernut milk blended with dates and coconut — naturally sweet.",    price: 600,  rating: 4.6, time: "2 min",  img: "https://images.pexels.com/photos/5652184/pexels-photo-5652184.jpeg" },
  { id: 15, category: "Drinks", name: "Chapman",           desc: "Classic Nigerian Chapman mocktail with Fanta, Sprite and bitters.",  price: 700,  rating: 4.7, time: "2 min",  img: "https://images.pexels.com/photos/37680615/pexels-photo-37680615.jpeg" },
  { id: 16, category: "Drinks", name: "Palm Wine",         desc: "Fresh tapped palm wine, naturally fermented and lightly sweet.",     price: 800,  rating: 4.5, time: "2 min",  img: "https://cdn.roadsandkingdoms.com/uploads/2018/06/Palmwine-Calabash-680x452.jpg" },
];

export default menuData;
