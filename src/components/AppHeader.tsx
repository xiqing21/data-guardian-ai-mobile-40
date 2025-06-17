
import React from 'react';
import { Button } from '@/components/ui/button';
import { Bell, User } from 'lucide-react';
import { Role } from '../types/Role';

interface AppHeaderProps {
  currentRole: Role;
}

const AppHeader: React.FC<AppHeaderProps> = ({ currentRole }) => {
  return (
    <div className="bg-white shadow-sm border-b sticky top-0 z-10">
      <div className="flex items-center justify-between p-4">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">山西省AI数据治理智能体</h1>
          <p className="text-xs text-gray-500">角色化智能服务平台 - {currentRole.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="p-2">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="p-2">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
