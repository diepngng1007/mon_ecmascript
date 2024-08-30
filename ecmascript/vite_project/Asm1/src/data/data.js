export const menus = [
  { id: 1, path: "/", name: "HomePage" },
  {
    id: 2,
    path: "/product",
    name: "Product",
    dropDown: [
      {
        id: 1,
        name: "Danh mục 1",
        path: "/product?id=1",
      },
      {
        id: 2,
        name: "Danh mục 2",
        path: "/product?id=2",
      },
      {
        id: 3,
        name: "Danh mục 3",
        path: "/product?id=3",
      },
    ],
  },
  { id: 3, path: "/contact", name: "Contact" },
  { id: 4, path: "/admin", name: "Admin" },
];

export const products = [
  {
    id: 1,
    name: "Product 1",
    image: "https://picsum.photos/200/250",
    price: 1000,
    CategoryId: 1,
  },
  {
    id: 2,
    name: "Product 2",
    image: "https://picsum.photos/200/250",
    price: 2000,
    CategoryId: 2,
  },
  {
    id: 3,
    name: "Product 3",
    image: "https://picsum.photos/200/250",
    price: 3000,
    CategoryId: 3,
  },
  {
    id: 4,
    name: "Product 4",
    image: "https://picsum.photos/200/250",
    price: 32000,
    CategoryId: 3,
  },
];

export const categories = [
  { id: 1, name: "Category 1" },
  { id: 2, name: "Category 2" },
  { id: 3, name: "Category 3" },
];
