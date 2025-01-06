export type SidebarConfigItem = {
  title: string;
  path: string;
  regEx?: RegExp[];
  icon?: any;
  auth: boolean;
  redirect?: boolean;
  redirectTo?: string;
  inactiveHideSubTab?: boolean;
  showId?: boolean;
  disabled?: boolean;
  subTab?: {
    title: string;
    path: string;
    icon?: any;
    auth: boolean;
    redirect?: boolean;
    disabled?: boolean;
    regEx?: RegExp;
  }[];
};
