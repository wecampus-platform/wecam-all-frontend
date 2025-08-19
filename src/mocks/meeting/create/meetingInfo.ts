import { Entity } from "@/hooks/meeting/create/useSelectedEntityPicker";

export const PARTICIPANT_SUGGESTIONS: Entity[] = [
  { id: "p1", name: "홍길동", avatar: `https://i.pravatar.cc/150?u=p1` },
  { id: "p2", name: "김철수", avatar: `https://i.pravatar.cc/150?u=p2` },
  { id: "p3", name: "이영희", avatar: `https://i.pravatar.cc/150?u=p3` },
  { id: "p4", name: "박지민", avatar: `https://i.pravatar.cc/150?u=p4` },
  { id: "p5", name: "최준호", avatar: `https://i.pravatar.cc/150?u=p5` },
];

export const CATEGORY_SUGGESTIONS: Entity[] = [
  { id: "c1", name: "기획 회의" },
  { id: "c2", name: "개발 회의" },
  { id: "c3", name: "디자인 회의" },
  { id: "c4", name: "마케팅 회의" },
  { id: "c5", name: "운영 회의" },
];
