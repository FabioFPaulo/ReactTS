import type { DragListItemProps } from "@/@types/dragList";
import { useSortable } from "@dnd-kit/sortable";
import { IconButton, ListItem, ListItemText } from "@mui/material";
import type { FC } from "react";
import { CSS } from "@dnd-kit/utilities";
import CloseIcon from "@mui/icons-material/Close";

const DragListItem: FC<DragListItemProps> = ({
  item: { id, ...item },
  onRemoveItem,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <ListItem
      ref={setNodeRef}
      slotProps={{
        root: {
          ...attributes,
          ...listeners,
          style,
        },
      }}
      sx={isDragging ? { background: "rgb(235,235,235)", borderRadius: 1 } : {}}
      secondaryAction={
        <IconButton
          size="small"
          color="error"
          disabled={isDragging}
          onClick={() => onRemoveItem(id)}
        >
          <CloseIcon />
        </IconButton>
      }
    >
      <ListItemText primary={item.content} />
    </ListItem>
  );
};

export default DragListItem;
