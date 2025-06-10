import { useState } from "react";
import { Wrench, Zap, FileText, Image } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
const availableTools = [{
  id: "web-search",
  name: "Web Search",
  icon: Zap
}, {
  id: "calculator",
  name: "Calculator",
  icon: Wrench
}, {
  id: "file-reader",
  name: "File Reader",
  icon: FileText
}, {
  id: "image-analysis",
  name: "Image Analysis",
  icon: Image
}];
export const ToolsSelectionCard = () => {
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const toggleTool = (toolId: string) => {
    setSelectedTools(prev => prev.includes(toolId) ? prev.filter(id => id !== toolId) : [...prev, toolId]);
  };
  return <Card>
      
      
    </Card>;
};