export interface ItemType {
  title: string;
  date: string;
  tags: string[];
}

export interface BlockType {
  month: string;
  color: string;
  items: ItemType[];
}