
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, Building2, MapPin, User } from 'lucide-react';
import { Role } from '../types/Role';

interface RoleSelectorProps {
  currentRole: Role;
  availableRoles: Role[];
  onRoleChange: (roleId: string) => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({
  currentRole,
  availableRoles,
  onRoleChange
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const getRoleIcon = (level: string) => {
    switch (level) {
      case 'province':
      case 'city':
      case 'county':
        return <Building2 className="h-4 w-4" />;
      case 'substation':
        return <MapPin className="h-4 w-4" />;
      case 'grid':
        return <User className="h-4 w-4" />;
      default:
        return <Building2 className="h-4 w-4" />;
    }
  };

  const getRoleLevelText = (level: string) => {
    switch (level) {
      case 'province': return '省级';
      case 'city': return '市级';
      case 'county': return '县级';
      case 'substation': return '供电所';
      case 'grid': return '网格';
      default: return level;
    }
  };

  const getRoleLevelColor = (level: string) => {
    switch (level) {
      case 'province': return 'bg-purple-100 text-purple-700';
      case 'city': return 'bg-blue-100 text-blue-700';
      case 'county': return 'bg-green-100 text-green-700';
      case 'substation': return 'bg-orange-100 text-orange-700';
      case 'grid': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 min-w-48 justify-between"
      >
        <div className="flex items-center gap-2">
          {getRoleIcon(currentRole.level)}
          <div className="text-left">
            <div className="font-medium text-sm">{currentRole.name}</div>
            <div className="text-xs text-gray-500">{currentRole.parentUnit}</div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Badge className={`text-xs px-2 py-0 ${getRoleLevelColor(currentRole.level)}`}>
            {getRoleLevelText(currentRole.level)}
          </Badge>
          <ChevronDown className="h-4 w-4" />
        </div>
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-[9999] max-h-64 overflow-y-auto">
          {availableRoles.map((role) => (
            <div
              key={role.id}
              className={`p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0 ${
                role.id === currentRole.id ? 'bg-blue-50' : ''
              }`}
              onClick={() => {
                onRoleChange(role.id);
                setIsOpen(false);
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getRoleIcon(role.level)}
                  <div>
                    <div className="font-medium text-sm">{role.name}</div>
                    {role.parentUnit && (
                      <div className="text-xs text-gray-500">{role.parentUnit}</div>
                    )}
                  </div>
                </div>
                <Badge className={`text-xs px-2 py-0 ${getRoleLevelColor(role.level)}`}>
                  {getRoleLevelText(role.level)}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoleSelector;
