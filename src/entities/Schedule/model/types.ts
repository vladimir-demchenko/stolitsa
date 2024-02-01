export interface ItemType {
  id: string;
  title: string;
  date: string;
  descriptions: string[];
  expire_time: string;
}

export interface BlockType {
  month: string;
  color: string;
  shifts: ItemType[];
}