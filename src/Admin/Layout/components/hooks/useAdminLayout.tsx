import { useMemo } from "react";
import { SidebarConfigItem } from "../sidebar-configs/sidebar-configs";
import { ProductIcon } from "@datn/common/icons";

export default function useAdminSidebar() {
  const forAdminSidebar: SidebarConfigItem[] = useMemo(() => {
    let configs: SidebarConfigItem[] = [];
    configs = [
      {
        title: "Dashboard",
        path: "/admin/dashboard",
        icon: ProductIcon,
        auth: true,
        subTab: [],
        disabled: false,
      },
      {
        title: "Products",
        path: "/admin/products",
        icon: ProductIcon,
        auth: true,
        subTab: [],
        disabled: false,
      },
    ];
    return configs;
  }, []);
  return { sidebar: forAdminSidebar };
}
