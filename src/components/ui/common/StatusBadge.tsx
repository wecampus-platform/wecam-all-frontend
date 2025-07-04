// components/common/StatusBadge.tsx
import { Badge } from "@/components/ui/badge";

type Props = {
  status: "Completed" | "In Progress" | "Not Started";
};

export default function StatusBadge({ status }: Props) {
  const classes = {
    Completed: "bg-green-50 text-green-600 border-green-200",
    "In Progress": "bg-sub-1 text-point border-sub-3",
    "Not Started": "bg-gray-11 text-gray-5 border-gray-2",
  };

  return (
    <Badge variant="outline" className={classes[status]}>
      {status}
    </Badge>
  );
}