// ── ordersData.js ────────────────────────────────────────────────
// Dummy order used by OrderTrackingPage.
// When the backend is connected, replace this with a real API call.

export const dummyOrder = {
  orderId:     "NJK-20489",
  deliveryFee: 500,
  items: [
    { name: "Jollof Rice", qty: 2, price: 2500 },
    { name: "Puff Puff",   qty: 1, price: 800  },
    { name: "Zobo Drink",  qty: 2, price: 500  },
  ],
};

export const trackingStages = [
  { id: 0, label: "Order Received",    desc: "We've got your order and it's been confirmed.",           duration: 4000 },
  { id: 1, label: "Preparing Your Food", desc: "Our chefs are cooking your meal fresh right now.",     duration: 6000 },
  { id: 2, label: "Out for Delivery",  desc: "Your food is on the way — rider is heading to you.",     duration: 7000 },
  { id: 3, label: "Delivered!",        desc: "Your order has arrived. Enjoy your Naija meal! 🎉",      duration: null },
];
