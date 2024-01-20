export interface ItemType {
  title: string;
  date: string;
  tags: string[];
  descriptions: string;
  expireTime: string;
}

export interface BlockType {
  month: string;
  color: string;
  items: ItemType[];
}