'use client';

import { Droppable, Draggable } from '@hello-pangea/dnd';
import NameTag from './nameTag';
import { ArrowRightIcon } from '@/components/icons/arrowRightIcon';

export default function NotPlacedMember({ members, onSectionClick }) {
    return (
        <Droppable droppableId="notPlaced" direction="horizontal">
            {(provided) => (
                <div
                    className="h-[100px] my-10 bg-white border border-gray9 rounded-[12px] px-8 flex items-center cursor-pointer hover:brightness-98"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    onClick={onSectionClick}
                >
                    <div className="flex items-center w-full justify-between">
                        <div className="flex items-center gap-2">
                            <div className="font-semibold text-[24px]">미배치 명단</div>
                            <div className="text-gray3 text-[16px]">{members.length}명</div>
                        </div>
                        <div className="flex items-center gap-2">
                            {members?.filter(m => m && m.councilMemberId).map((m, index) => (
                                <Draggable key={m.councilMemberId} draggableId={m.councilMemberId.toString()} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="cursor-grab active:cursor-grabbing"
                                        >
                                            <NameTag name={m.name || 'Unknown'} />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                            <ArrowRightIcon />
                        </div>
                    </div>
                </div>
            )}
        </Droppable>
    );
}
