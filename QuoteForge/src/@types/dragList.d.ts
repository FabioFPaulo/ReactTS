export interface DragListItem {
  id: string;
  content: string;
}

export type DragListItemProps = {
  item: DragListItem;
  index: number;
  onRemoveItem: (id: string) => void;
};

export interface DragListProps {
  items: DragListItem[];
  handleDragEnd: (event: DragEndEvent) => void;
  onRemoveItem: DragListItemProps["onRemoveItem"];
}
