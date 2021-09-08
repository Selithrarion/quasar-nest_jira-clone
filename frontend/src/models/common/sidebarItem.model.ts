export interface SidebarItemModel {
  label?: string;
  icon?: string;

  routeName?: string;
  action?: () => void;
  dialog?: boolean;
  separator?: boolean;

  hideHeaderTitleRowActions?: boolean
  hideHeaderActions?: boolean
}
