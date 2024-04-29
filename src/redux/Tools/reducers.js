import { CATEGORY, DEVICETYPE, IMAGES, NOTIFICATION, PRODUCTS, REPATCH } from "./constants";


const initialState = {
  category: [
    {
      id: 1,
      name: "All",
      param: "all",
    },
    {
      id: 1,
      name: "Home Appliances",
      param: "home-appliances",
      children: [
        {
          id: 4545,
          name: "All",
          param: "home-appliances",
        },
        {
          id: 4545,
          name: "Cooling && Heating",
          children: [
            { id: 2, name: "Ceiling Fan", param: "ceiling-fan" },
            { id: 3, name: "Exhaust Fan", param: "exhaust-fan" },
            { id: 4, name: "Air Conditioner  && Cooler", param: "air-conditioner-cooler" },
            { id: 5, name: "Rechargable Fan", param: "rechargable-fan" },
          ],
        },
      ]
    },
    {
      id: 2,
      name: "Accessories",
      param: "accessories",
      children: [
        {
          id: 4545,
          name: "All",
          param: "accessories",
        },
        {
          id: 1,
          name: "Bluthooth Speaker",
          param: "bluthooth-speaker",
        },
        {
          id: 2,
          name: "TWS",
          param: "tws",
        },
        {
          id: 3,
          name: "Mouse",
          param: "Mouse",
        },
        {
          id: 4,
          name: "Keyboard",
          param: "keyboard",
        },
        {
          id: 3,
          name: "Cable",
          param: "cable",
        },
        {
          id: 3,
          name: "Power Bank",
          param: "power-bank",
        },
        {
          id: 3,
          name: "Camera",
          param: "camera",
        },
        {
          id: 3,
          name: "Tripod",
          param: "tripod",
        },
        {
          id: 3,
          name: "Multi Plage",
          param: "multi-plage",
        },
        {
          id: 3,
          name: "Selfie Stick",
          param: "selpie-stick",
        },
        {
          id: 3,
          name: "Memory Card",
          param: "memory-card",
        },
        {
          id: 3,
          name: "Battery",
          param: "battery",
        },
        {
          id: 3,
          name: "Wifi Adapter",
          param: "wifi-adapter",
        },
        {
          id: 3,
          name: "Laptop Cooler",
          param: "wifi-adapter",
        },
        {
          id: 3,
          name: "Smart Door Lock",
          param: "smart-door-lock",
        }
      ]
    },
    {
      id: 2,
      name: "Smartphone",
      param: "smartphone",
      children: [
        {
          id: 4545,
          name: "All",
          param: "smartphone",
        },
        {
          id: 4545,
          name: "Brands",
          children: [
            {
              id: 1,
              name: "Apple",
              param: "apple",
            },
            {
              id: 2,
              name: "Samsung",
              param: "samsung",
            },
            {
              id: 3,
              name: "Xiaomi",
              param: "xiaomi",
            },
            {
              id: 4,
              name: "Huawei",
              param: "huawei",
            },
            {
              id: 5,
              name: "Google",
              param: "google",
            },
            {
              id: 6,
              name: "OnePlus",
              param: "oneplus",
            },
            {
              id: 7,
              name: "Motorola",
              param: "motorola",
            },
            {
              id: 8,
              name: "Infinix",
              param: "infinix",
            },
            {
              id: 9,
              name: "Realme",
              param: "realme",
            },
            {
              id: 10,
              name: "Vivo",
              param: "vivo",
            },
            {
              id: 11,
              name: "Oppo",
              param: "oppo",
            },
            {
              id: 12,
              name: "Nokia",
              param: "nokia",
            },
            {
              id: 13,
              name: "Sony",
              param: "sony",
            },
            {
              id: 14,
              name: "LG",
              param: "lg",
            },
            {
              id: 15,
              name: "Asus",
              param: "asus",
            },
            {
              id: 16,
              name: "Nothing",
              param: "nothing",
            }
          ],
        }
      ]
    },
    {
      id: 4,
      name: "Ups & Ips",
      param: "ups-ips",
      children: [
        {
          id: 1,
          name: "All",
          param: "ups-ips",
        },
        {
          id: 2,
          name: "Category",
          param: "category",
          children: [
            { id: 1, name: "IPS", param: "ips" },
            { id: 1, name: "Online UPS", param: "online-ups" },
            { id: 1, name: "Offline UPS", param: "offline-ups" },
            { id: 1, name: "MINI UPS", param: "mini-ups" },
            { id: 1, name: "UPS Battery", param: "ups-battery" },
            { id: 1, name: "Boltage Stablizer", param: "boltage-stablizer" },
          ]
        }
      ]
    },
    {
      id: 25,
      name: "Headphone",
      param: "headphone",
      children: [
        {
          id: 1,
          name: "All",
          param: "headphone",
        },
        {
          id: 2,
          name: "Brands",
          param: "brands",
          children: [
            { id: 1, name: "Apple", param: "apple" },
            { id: 2, name: "Poly", param: "poly" },
            { id: 2, name: "Hoco", param: "hoco" },
            { id: 2, name: "Gamdias", param: "gamdias" },
            { id: 2, name: "Razar", param: "razar" },
            { id: 2, name: "KWG", param: "kwg" },
            { id: 2, name: "Xtrike Me", param: "xtrike-me" },
            { id: 2, name: "Logitech", param: "logitech" },
            { id: 2, name: "Redragon", param: "redragon" },
            { id: 2, name: "Astrum", param: "astrum" },
            { id: 2, name: "BoAt", param: "boat" },
            { id: 2, name: "Havit", param: "havit" },
            { id: 2, name: "Sony", param: "sony" },

          ]
        }
      ]
    },
    {
      id: 3,
      name: "TV & Monitor",
      param: "tv-monitor",
      children: [
        {
          id: 1,
          name: "All",
          param: "tv-monitor",
        },
        {
          id: 1,
          name: "Brands",
          children: [
            { id: 2, name: "Samsung", param: "samsung" },
            { id: 3, name: "Sony", param: "sony" },
            { id: 4, name: "Xiomi", param: "xiomi" },
            { id: 5, name: "Singer", param: "singer" },
            { id: 6, name: "LG", param: "lg" },
            { id: 7, name: "Rowa", param: "rowa" },
            { id: 8, name: "OnePlus", param: "oneplus" },
            { id: 9, name: "Starex", param: "starex" },
            { id: 10, name: "Jvco", param: "jvco" },
          ],
        },
        {
          id: 3,
          name: "Smart TV",
          param: "smart-tv",
        },
        {
          id: 4,
          name: "LED TV",
          param: "led-tv",
        },
        {
          id: 5,
          name: "Android Tv",
          param: "android-tv",
        }
      ]
    },
    {
      id: 3,
      name: "Air Conditioner",
      param: "air-conditioner",
      children: [
        {
          id: 1,
          name: "Air Conditioner",
          param: "air-conditioner",
        },
      ]
    },
  ],
  showNotification: false,
  allProducts: {
    banners: [],
    deals: [],
    topTen: [],
    popular: [],
    hotSales: [],
    flashSale: [],
    newArrival: []
  },
};

const Tools = (state = initialState, action) => {
  switch (action.type) {
    case DEVICETYPE:
      return {
        ...state,
        deviceType: action.payload,
      };
    case CATEGORY:
      return {
        ...state,
        category: action.payload
      }
    case REPATCH:
      return {
        ...state,
        repatch: action.payload
      }
    case IMAGES:
      return {
        ...state,
        images: action.payload
      }
    case NOTIFICATION:
      return {
        ...state,
        showNotification: action.payload
      }
    case PRODUCTS:
      return {
        ...state,
        allProducts: action.payload
      }
    default:
      return { ...state };
  }
};

export default Tools;
