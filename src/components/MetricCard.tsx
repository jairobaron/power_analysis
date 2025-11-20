import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon?: LucideIcon;
  trend?: "positive" | "negative" | "neutral";
  className?: string;
}

export const MetricCard = ({ 
  title, 
  value, 
  unit, 
  icon: Icon,
  trend = "neutral",
  className 
}: MetricCardProps) => {
  return (
    <Card className={cn("border-border/50 shadow-sm hover:shadow-md transition-shadow", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4" />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-1">
          <span className={cn(
            "text-2xl font-bold",
            trend === "positive" && "text-metric-positive",
            trend === "negative" && "text-metric-negative",
            trend === "neutral" && "text-foreground"
          )}>
            {value}
          </span>
          {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
        </div>
      </CardContent>
    </Card>
  );
};
