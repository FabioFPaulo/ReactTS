import type { DragListProps } from "@/@types/dragList";
import { List } from "@mui/material";
import React, { type FC } from "react";
import DraggableListItem from "./DragListItem";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

const DragList: FC<DragListProps> = React.memo(
  ({ items, handleDragEnd, onRemoveItem }) => {
    const sensors = useSensors(
      useSensor(PointerSensor, {
        activationConstraint: {
          delay: 100,
          tolerance: 100,
        },
      }),

      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      }),
    );

    return (
      <List>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {items.map((item, index) => (
              <DraggableListItem
                item={item}
                index={index}
                key={item.id}
                onRemoveItem={onRemoveItem}
              />
            ))}
          </SortableContext>
        </DndContext>
      </List>
    );
  },
);

export default DragList;
