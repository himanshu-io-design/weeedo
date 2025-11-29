import React from 'react';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import type { Identifier } from 'dnd-core';
import svgPaths from '../imports/svg-2h6h5d4xfl';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdBy: string;
}

interface DraggableTodoItemProps {
  todo: Todo;
  index: number;
  onToggle: () => void;
  onDelete: () => void;
  onMove: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

function GripHorizontal({ isDragging }: { isDragging: boolean }) {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="grip-horizontal">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="grip-horizontal">
          <path d={svgPaths.p2307c172} fill="var(--fill-0, #57534E)" id="Vector" stroke="var(--stroke-0, #57534E)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p35f3d000} fill="var(--fill-0, #57534E)" id="Vector_2" stroke="var(--stroke-0, #57534E)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p1735ba00} fill="var(--fill-0, #57534E)" id="Vector_3" stroke="var(--stroke-0, #57534E)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p1e384980} fill="var(--fill-0, #57534E)" id="Vector_4" stroke="var(--stroke-0, #57534E)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p35447980} fill="var(--fill-0, #57534E)" id="Vector_5" stroke="var(--stroke-0, #57534E)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p3fa3fd00} fill="var(--fill-0, #57534E)" id="Vector_6" stroke="var(--stroke-0, #57534E)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Trash() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="trash-2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="trash-2">
          <path d="M2.5 5H17.5" id="Vector" stroke="var(--stroke-0, #57534E)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p26c6b600} id="Vector_2" stroke="var(--stroke-0, #57534E)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p276bd300} id="Vector_3" stroke="var(--stroke-0, #57534E)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.33333 9.16667V14.1667" id="Vector_4" stroke="var(--stroke-0, #57534E)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11.6667 9.16667V14.1667" id="Vector_5" stroke="var(--stroke-0, #57534E)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

export const DraggableTodoItem: React.FC<DraggableTodoItemProps> = ({ todo, index, onToggle, onDelete, onMove }) => {
  const ref = useRef<HTMLDivElement>(null);
  const dragHandleRef = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: 'TODO_ITEM',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset?.y ?? 0) - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      onMove(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'TODO_ITEM',
    item: () => {
      return { id: todo.id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Only attach drag to the grip handle, not the entire item
  drag(dragHandleRef);
  drop(ref);

  return (
    <div
      ref={ref}
      data-handler-id={handlerId}
      className={`content-stretch flex gap-[16px] items-center relative shrink-0 w-full group ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0" data-name="Checkbox">
        <div className={`basis-0 grow min-h-px min-w-px relative rounded-[8px] shrink-0 transition-all ${isDragging ? 'bg-stone-200' : 'bg-stone-200 hover:bg-stone-300'}`} data-name="_checkbox">
          <div aria-hidden="true" className={`absolute border border-solid ${isDragging ? 'border-stone-400 shadow-[0px_2px_6px_0px_#e7e5e4]' : 'border-stone-200'} inset-0 pointer-events-none rounded-[8px] transition-all`} />
          <div className="flex flex-row items-center size-full">
            <div className="box-border content-stretch flex gap-[16px] items-center px-[16px] py-[14px] relative w-full">
              <div 
                className="box-border content-stretch flex gap-[10px] items-start p-[4px] relative shrink-0 cursor-pointer" 
                data-name="Inline"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle();
                }}
                onMouseDown={(e) => {
                  e.stopPropagation();
                }}
                onPointerDown={(e) => {
                  e.stopPropagation();
                }}
                style={{ pointerEvents: 'auto' }}
              >
                <div className="bg-stone-50 relative rounded-[4px] shrink-0 size-[16px] pointer-events-none" data-name="Check Icon">
                  <div className="content-stretch flex items-center justify-center overflow-clip rounded-[inherit] size-[16px]">
                    {todo.completed && (
                      <svg className="block size-[12px]" fill="none" viewBox="0 0 12 12">
                        <path d="M10 3L4.5 8.5L2 6" stroke="#57534E" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <div aria-hidden="true" className="absolute border border-solid border-stone-600 inset-0 pointer-events-none rounded-[4px]" />
                </div>
              </div>
              <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0 pointer-events-none" data-name="List">
                <p className={`font-['Inter_Display:Medium',sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] w-full ${todo.completed ? 'line-through text-stone-400' : 'text-stone-800'}`}>
                  {todo.text}
                </p>
              </div>
              <div 
                ref={dragHandleRef}
                className={`cursor-grab active:cursor-grabbing transition-opacity ${isDragging ? 'opacity-100' : 'opacity-40 group-hover:opacity-100'}`}
              >
                <GripHorizontal isDragging={isDragging} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div 
        className="box-border content-stretch flex gap-[8px] items-center p-[4px] relative shrink-0 cursor-pointer opacity-40 group-hover:opacity-100 transition-opacity hover:scale-110"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
        onPointerDown={(e) => {
          e.stopPropagation();
        }}
        style={{ pointerEvents: 'auto' }}
      >
        <div style={{ pointerEvents: 'none' }}>
          <Trash />
        </div>
      </div>
    </div>
  );
}
