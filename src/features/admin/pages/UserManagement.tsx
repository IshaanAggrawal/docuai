import { useState } from "react";
import { Plus, Search, Filter, User, Mail, Phone, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UserTable from "../components/UserTable";
import RoleSelector from "../components/RoleSelector";

const UserManagement = () => {
  const [showNewUserForm, setShowNewUserForm] = useState(false);

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground">Manage users and their permissions</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button onClick={() => setShowNewUserForm(!showNewUserForm)}>
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
      </div>

      {/* New User Form */}
      {showNewUserForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Add New User</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Enter full name" className="pl-10" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input type="email" placeholder="Enter email" className="pl-10" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input type="tel" placeholder="Enter phone number" className="pl-10" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Department</label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Enter department" className="pl-10" />
                </div>
              </div>
              <div className="md:col-span-2">
                <RoleSelector onRoleChange={(role) => console.log(role)} />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="outline" onClick={() => setShowNewUserForm(false)}>
                Cancel
              </Button>
              <Button>
                Add User
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* User Table */}
      <UserTable />
    </div>
  );
};

export default UserManagement;