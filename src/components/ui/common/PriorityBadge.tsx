// components/common/PriorityBadge.tsx
import { Badge } from "@/components/ui/badge";

type Props = {
  priority: "High" | "Medium" | "Low";
};

export default function PriorityBadge({ priority }: Props) {
  const classes = {
    High: "bg-red-50 text-red border-red-200",
    Medium: "bg-orange-50 text-orange-600 border-orange-200",
    Low: "bg-gray-11 text-gray-5 border-gray-2",
  };

  return (
    <Badge variant="outline" className={classes[priority]}>
      {priority}
    </Badge>
  );
}
