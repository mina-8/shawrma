import React, { useEffect, useState } from 'react';

interface DynamicIconProps {
  iconPath: string;
  size?: number;
  className?: string;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({ iconPath, size = 20, className }) => {
  const [IconComponent, setIconComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    const loadIcon = async () => {
      if (!iconPath.includes('/')) return;

      const [prefix, iconName] = iconPath.split('/');
      let lib: any;

      try {
        switch (prefix.toLowerCase()) {
          case 'fa':
            lib = await import('react-icons/fa');
            break;
          case 'fa6':
            lib = await import('react-icons/fa6');
            break;
          case 'ti':
            lib = await import('react-icons/ti');
            break;
          case 'sl':
            lib = await import('react-icons/sl');
            break;
          case 'ai':
            lib = await import('react-icons/ai');
            break;
          case 'io':
            lib = await import('react-icons/io');
            break;
          default:
            return;
        }

        const key = Object.keys(lib).find((k) =>
          k.toLowerCase().includes(iconName.toLowerCase())
        );

        if (key) {
          setIconComponent(() => lib[key]);
        }
      } catch (error) {
        console.error('Error loading icon:', error);
      }
    };

    loadIcon();
  }, [iconPath]);

  if (!IconComponent) return <span className="text-xs text-white">?</span>;

  return <IconComponent  />;
};

export default DynamicIcon;
