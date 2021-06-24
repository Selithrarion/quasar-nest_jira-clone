export default interface SidebarItemInterface {
  label: string;
  icon: string;

  url?: string;
  dialog?: boolean;
  lastInGroup?: boolean;
}
