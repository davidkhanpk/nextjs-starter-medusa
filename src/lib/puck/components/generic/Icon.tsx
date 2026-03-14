'use client';

import { ComponentConfig } from '@measured/puck';
import * as HeroIcons from '@heroicons/react/24/outline';
import { resolveColor } from '@/lib/theme/token-utils';

// List of popular Hero Icons for the picker
export const HERO_ICONS = [
  'AcademicCapIcon',
  'AdjustmentsHorizontalIcon',
  'ArchiveBoxIcon',
  'ArrowDownIcon',
  'ArrowLeftIcon',
  'ArrowRightIcon',
  'ArrowUpIcon',
  'BanknotesIcon',
  'Bars3Icon',
  'BeakerIcon',
  'BellIcon',
  'BoltIcon',
  'BookOpenIcon',
  'BookmarkIcon',
  'BriefcaseIcon',
  'CalendarIcon',
  'CameraIcon',
  'ChartBarIcon',
  'ChatBubbleLeftIcon',
  'CheckCircleIcon',
  'CheckIcon',
  'ChevronDownIcon',
  'ChevronLeftIcon',
  'ChevronRightIcon',
  'ChevronUpIcon',
  'ClipboardIcon',
  'ClockIcon',
  'CloudIcon',
  'Cog6ToothIcon',
  'CreditCardIcon',
  'CubeIcon',
  'CurrencyDollarIcon',
  'DocumentIcon',
  'EnvelopeIcon',
  'ExclamationCircleIcon',
  'EyeIcon',
  'FaceSmileIcon',
  'FireIcon',
  'FlagIcon',
  'FolderIcon',
  'GiftIcon',
  'GlobeAltIcon',
  'HandThumbUpIcon',
  'HeartIcon',
  'HomeIcon',
  'InformationCircleIcon',
  'KeyIcon',
  'LightBulbIcon',
  'LinkIcon',
  'LockClosedIcon',
  'MagnifyingGlassIcon',
  'MapIcon',
  'MapPinIcon',
  'MegaphoneIcon',
  'MicrophoneIcon',
  'MinusIcon',
  'MoonIcon',
  'MusicalNoteIcon',
  'PaperAirplaneIcon',
  'PencilIcon',
  'PhoneIcon',
  'PhotoIcon',
  'PlayIcon',
  'PlusIcon',
  'PrinterIcon',
  'QrCodeIcon',
  'QuestionMarkCircleIcon',
  'RocketLaunchIcon',
  'ScaleIcon',
  'ShieldCheckIcon',
  'ShoppingBagIcon',
  'ShoppingCartIcon',
  'SparklesIcon',
  'StarIcon',
  'SunIcon',
  'TagIcon',
  'TruckIcon',
  'UserIcon',
  'UsersIcon',
  'VideoCameraIcon',
  'WalletIcon',
  'WifiIcon',
  'XMarkIcon',
];

export interface IconProps {
  id: string;
  iconName: string;
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  color?: string;
  strokeWidth: '1' | '1.5' | '2' | '2.5';
  alignment: 'left' | 'center' | 'right';
  marginTop?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  marginBottom?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

export const Icon: ComponentConfig<IconProps> = {
  label: 'Icon',
  fields: {
    id: { type: 'text', label: 'ID' },
    iconName: {
      type: 'select',
      label: 'Icon',
      options: HERO_ICONS.map(icon => ({
        label: icon.replace('Icon', '').replace(/([A-Z])/g, ' $1').trim(),
        value: icon,
      })),
    },
    size: {
      type: 'select',
      label: 'Size',
      options: [
        { label: 'Extra Small (16px)', value: 'xs' },
        { label: 'Small (20px)', value: 'sm' },
        { label: 'Medium (24px)', value: 'md' },
        { label: 'Large (32px)', value: 'lg' },
        { label: 'Extra Large (40px)', value: 'xl' },
        { label: '2XL (48px)', value: '2xl' },
      ],
    },
    color: {
      type: 'custom',
      label: 'Color',
      render: ({ value, onChange }) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="color"
            value={value || '#000000'}
            onChange={(e) => onChange(e.target.value)}
            style={{ width: '60px', height: '32px', cursor: 'pointer', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="#000000"
            style={{ flex: 1, padding: '6px 8px', border: '1px solid #ccc', borderRadius: '4px', fontFamily: 'monospace' }}
          />
        </div>
      ),
    },
    strokeWidth: {
      type: 'radio',
      label: 'Stroke Width',
      options: [
        { label: '1', value: '1' },
        { label: '1.5', value: '1.5' },
        { label: '2', value: '2' },
        { label: '2.5', value: '2.5' },
      ],
    },
    alignment: {
      type: 'radio',
      label: 'Alignment',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
    marginTop: {
      type: 'select',
      label: 'Margin Top',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'Extra Large', value: 'xl' },
      ],
    },
    marginBottom: {
      type: 'select',
      label: 'Margin Bottom',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'Extra Large', value: 'xl' },
      ],
    },
  },
  defaultProps: {
    id: 'icon-1',
    iconName: 'HeartIcon',
    size: 'md',
    strokeWidth: '2',
    alignment: 'center',
    marginTop: 'none',
    marginBottom: 'md',
  },
  render: ({ id, iconName, size, color, strokeWidth, alignment, marginTop, marginBottom }) => {
    // @ts-ignore - Dynamic icon import
    const IconComponent = HeroIcons[iconName as keyof typeof HeroIcons];

    if (!IconComponent) {
      return (
        <div className="text-red-500 text-sm">
          Icon "{iconName}" not found
        </div>
      );
    }

    const sizeClasses = {
      xs: 'w-4 h-4',
      sm: 'w-5 h-5',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
      xl: 'w-10 h-10',
      '2xl': 'w-12 h-12',
    };

    const alignmentClasses = {
      left: 'mr-auto',
      center: 'mx-auto',
      right: 'ml-auto',
    };

    const marginTopClasses = {
      none: '',
      sm: 'mt-2',
      md: 'mt-4',
      lg: 'mt-6',
      xl: 'mt-8',
    };

    const marginBottomClasses = {
      none: '',
      sm: 'mb-2',
      md: 'mb-4',
      lg: 'mb-6',
      xl: 'mb-8',
    };

    const className = [
      sizeClasses[size] || 'w-6 h-6',
      alignmentClasses[alignment] || 'mx-auto',
      marginTopClasses[marginTop || 'none'],
      marginBottomClasses[marginBottom || 'md'],
    ].filter(Boolean).join(' ');

    const style: React.CSSProperties = {
      strokeWidth,
    };

    if (color) {
      style.color = resolveColor(color);
    }

    return (
      <IconComponent 
        id={id} 
        className={className} 
        style={style}
      />
    );
  },
};

export default Icon;
