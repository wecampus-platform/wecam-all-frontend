'use client';

import { Droppable, Draggable } from '@hello-pangea/dnd';
import NameTag from './nameTag';

export default function CouncilMemberSection({ sections = [], setSections }) {
    const handleAddSection = () => {
        const newSection = {
            id: `section-${Date.now()}`,
            title: '새로운 부서',
            number: '0명',
            leadTitle: '부장',
            subTitle: '부원',
            lead: [],
            sub: [],
        };
        setSections((prev) => [...prev, newSection]);
    };

    return (
        <div className="grid grid-cols-2 gap-4 w-full">
            {sections.map((section) => (
                <div
                    key={section.id}
                    className="h-fit bg-white border border-gray9 rounded-[12px] p-8 flex flex-col gap-4"
                >
                    {/* 섹션 제목 */}
                    <div className="flex flex-row gap-3">
                        <div className="font-semibold text-[24px]">{section.title}</div>
                        <div className="text-gray3 text-[16px]">
                            {section.lead.length + section.sub.length}명
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="text-gray8 text-[12px]">{section.leadTitle}</div>
                        <Droppable droppableId={`${section.id}:lead`} direction="horizontal">
                            {(provided) => (
                                <div className="relative">
                                    <div
                                        className="flex flex-wrap gap-2 min-h-[40px]"
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        {section.lead.map((m, index) => (
                                            <Draggable key={m.id} draggableId={String(m.id)} index={index}>
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <NameTag name={m.name} />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="text-gray8 text-[12px]">{section.subTitle}</div>
                        <Droppable droppableId={`${section.id}:sub`} direction="horizontal">
                            {(provided) => (
                                <div className="relative">
                                    <div
                                        className="flex flex-wrap gap-2 min-h-[40px]"
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        {section.sub.map((m, index) => (
                                            <Draggable key={m.id} draggableId={String(m.id)} index={index}>
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <NameTag name={m.name} />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    </div>
                </div>
            ))}


            {/* + 버튼 */}
            <button
                onClick={handleAddSection}
                className="min-h-[200px] py-8 rounded-[12px] border border-gray9 bg-white text-point text-3xl font-semibold flex items-center justify-center"
            >
                +
            </button>
        </div>
    );
}
