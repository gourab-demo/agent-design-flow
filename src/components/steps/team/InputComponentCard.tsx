import { useState } from "react";
import { Plus, X, FileText, Upload, Link, Image, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface InputComponent {
  id: string;
  type: string;
  enabled: boolean;
  icon: React.ComponentType<any>;
  label: string;
  placeholder: string;
}

const inputTypes = [{
  value: "text",
  label: "Text",
  icon: FileText,
  defaultLabel: "Text Input",
  defaultPlaceholder: "Enter text here..."
}, {
  value: "file",
  label: "File",
  icon: Upload,
  defaultLabel: "File Upload",
  defaultPlaceholder: "Choose a file"
}, {
  value: "url",
  label: "URL",
  icon: Link,
  defaultLabel: "URL Input",
  defaultPlaceholder: "Enter URL here..."
}, {
  value: "image",
  label: "Image",
  icon: Image,
  defaultLabel: "Image Upload",
  defaultPlaceholder: "Choose an image"
}];

export const InputComponentCard = () => {
  const [inputs, setInputs] = useState<InputComponent[]>([{
    id: "1",
    type: "text",
    enabled: true,
    icon: FileText,
    label: "Text Input",
    placeholder: "Enter text here..."
  }]);

  const addInput = () => {
    const defaultType = inputTypes[0];
    const newInput: InputComponent = {
      id: Date.now().toString(),
      type: defaultType.value,
      enabled: true,
      icon: defaultType.icon,
      label: defaultType.defaultLabel,
      placeholder: defaultType.defaultPlaceholder
    };
    setInputs([...inputs, newInput]);
  };

  const removeInput = (id: string) => {
    setInputs(inputs.filter(input => input.id !== id));
  };

  const updateInput = (id: string, field: string, value: any) => {
    setInputs(inputs.map(input => {
      if (input.id === id) {
        let updatedInput = { ...input, [field]: value };
        
        // Update icon and defaults when type changes
        if (field === 'type') {
          const typeConfig = inputTypes.find(type => type.value === value);
          if (typeConfig) {
            updatedInput.icon = typeConfig.icon;
            updatedInput.label = typeConfig.defaultLabel;
            updatedInput.placeholder = typeConfig.defaultPlaceholder;
          }
        }
        
        return updatedInput;
      }
      return input;
    }));
  };

  return (
    <TooltipProvider>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Input Components</CardTitle>
          <Button onClick={addInput} size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Input
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {inputs.map(input => {
            const IconComponent = inputTypes.find(type => type.value === input.type)?.icon || FileText;
            return (
              <div key={input.id} className="p-4 border rounded-lg space-y-4">
                {/* Header Row with Icon, Type, Enabled, and Remove */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg">
                    <IconComponent className="h-5 w-5 text-gray-600" />
                  </div>
                  
                  <div className="flex-1">
                    <Label className="text-xs text-gray-500">Type</Label>
                    <Select value={input.type} onValueChange={value => updateInput(input.id, "type", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {inputTypes.map(type => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center gap-2">
                              <type.icon className="h-4 w-4" />
                              {type.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-4">
                    <div>
                      <Label className="text-xs text-gray-500">Enabled</Label>
                      <div className="mt-2">
                        <Switch 
                          checked={input.enabled} 
                          onCheckedChange={checked => updateInput(input.id, "enabled", checked)} 
                        />
                      </div>
                    </div>
                    {inputs.length > 1 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeInput(input.id)} 
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>

                {/* Label and Placeholder Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <Label className="text-xs text-gray-500">Label</Label>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-3 w-3 text-gray-400 hover:text-gray-600 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>The display text that appears above the input field for users</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Input
                      value={input.label}
                      onChange={(e) => updateInput(input.id, "label", e.target.value)}
                      placeholder="Enter label text"
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <Label className="text-xs text-gray-500">Placeholder</Label>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-3 w-3 text-gray-400 hover:text-gray-600 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Help text that appears inside the input field when it's empty</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Input
                      value={input.placeholder}
                      onChange={(e) => updateInput(input.id, "placeholder", e.target.value)}
                      placeholder="Enter placeholder text"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};
