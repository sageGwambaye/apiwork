
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Server } from "lucide-react";

interface NodeIndicatorProps {
  nodeId: string;
}

const NodeIndicator = ({ nodeId }: NodeIndicatorProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="outline" className="gap-1 border-blue-200 hover:border-blue-300 cursor-help">
            <Server className="h-3 w-3" />
            <span className="text-xs">{nodeId}</span>
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">Currently served by node: {nodeId}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default NodeIndicator;
