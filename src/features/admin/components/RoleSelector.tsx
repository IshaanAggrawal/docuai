import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RoleSelectorProps {
  onRoleChange: (role: string) => void;
  defaultValue?: string;
}

const RoleSelector = ({ onRoleChange, defaultValue = "employee" }: RoleSelectorProps) => {
  const [selectedRole, setSelectedRole] = useState(defaultValue);
  
  const roles = [
    { id: "admin", name: "Administrator", description: "Full access to all system features" },
    { id: "manager", name: "Manager", description: "Manage team members and workflows" },
    { id: "employee", name: "Employee", description: "Standard user access" },
  ];

  const handleRoleChange = (value: string) => {
    setSelectedRole(value);
    onRoleChange(value);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Role</label>
      <Select value={selectedRole} onValueChange={handleRoleChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select a role" />
        </SelectTrigger>
        <SelectContent>
          {roles.map((role) => (
            <SelectItem key={role.id} value={role.id}>
              <div className="flex items-center">
                <div>
                  <div className="font-medium">{role.name}</div>
                  <div className="text-xs text-muted-foreground">{role.description}</div>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default RoleSelector;