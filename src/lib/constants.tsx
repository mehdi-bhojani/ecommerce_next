import {
  Boxes,
  LayoutDashboard,
  Palette,
  Shapes,
  ShoppingBag,
  Star,
  Store,
  Tag,
  UsersRound,
} from "lucide-react";

export const navLinks = [
  {
    url: "/admin/",
    icon: <LayoutDashboard />,
    label: "Dashboard",
  },
  {
    url: "/admin/collections",
    icon: <Shapes />,
    label: "Collections",
  },
  {
    url: "/admin/categories",
    icon: <Boxes />,
    label: "Categories",
  },
  {
    url: "/admin/products",
    icon: <Tag />,
    label: "Products",
  },
  {
    url: "/admin/orders",
    icon: <ShoppingBag />,
    label: "Orders",
  },
  {
    url: "/admin/customers",
    icon: <UsersRound />,
    label: "Customers",
  },
  {
    url: "/admin/reviews",
    icon: <Star />,
    label: "Reviews",
  },
  {
    url: "/admin/store",
    icon: <Store />,
    label: "Store",
  },
  {
    url: "/admin/Appearence",
    icon: <Palette /> ,
    label: "Appearence",
  },
];

