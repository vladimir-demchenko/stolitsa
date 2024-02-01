export interface ItemType {
  id: string;
  title: string;
  date: string;
  descriptions: string[];
  expire_time: string;
  open_reg: boolean;
}

export interface BlockType {
  month: string;
  color: string;
  shifts: ItemType[];
}