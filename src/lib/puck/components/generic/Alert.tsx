'use client';

import { ComponentConfig } from '@measured/puck';
import { 
  InformationCircleIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon, 
  XCircleIcon 
} from '@heroicons/react/24/outline';

export interface AlertProps {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  message: string;
  showIcon: boolean;
  dismissible: boolean;
}

export const Alert: ComponentConfig<AlertProps> = {
  label: 'Alert',
  fields: {
    id: { type: 'text', label: 'ID' },
    type: {
      type: 'radio',
      label: 'Type',
      options: [
        { label: 'Info', value: 'info' },
        { label: 'Success', value: 'success' },
        { label: 'Warning', value: 'warning' },
        { label: 'Error', value: 'error' },
      ],
    },
    title: {
      type: 'text',
      label: 'Title (Optional)',
    },
    message: {
      type: 'textarea',
      label: 'Message',
    },
    showIcon: {
      type: 'radio',
      label: 'Show Icon',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    dismissible: {
      type: 'radio',
      label: 'Dismissible',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
  },
  defaultProps: {
    id: 'alert-1',
    type: 'info',
    message: 'This is an alert message',
    showIcon: true,
    dismissible: false,
  },
  render: ({ id, type, title, message, showIcon, dismissible }) => {
    const styles = {
      info: {
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        border: 'border-blue-200 dark:border-blue-800',
        text: 'text-blue-800 dark:text-blue-200',
        icon: InformationCircleIcon,
      },
      success: {
        bg: 'bg-green-50 dark:bg-green-900/20',
        border: 'border-green-200 dark:border-green-800',
        text: 'text-green-800 dark:text-green-200',
        icon: CheckCircleIcon,
      },
      warning: {
        bg: 'bg-yellow-50 dark:bg-yellow-900/20',
        border: 'border-yellow-200 dark:border-yellow-800',
        text: 'text-yellow-800 dark:text-yellow-200',
        icon: ExclamationTriangleIcon,
      },
      error: {
        bg: 'bg-red-50 dark:bg-red-900/20',
        border: 'border-red-200 dark:border-red-800',
        text: 'text-red-800 dark:text-red-200',
        icon: XCircleIcon,
      },
    };

    const style = styles[type];
    const IconComponent = style.icon;

    return (
      <div
        id={id}
        className={`${style.bg} ${style.border} ${style.text} border rounded-lg p-4 flex items-start gap-3`}
        role="alert"
      >
        {showIcon && (
          <IconComponent className="w-5 h-5 flex-shrink-0 mt-0.5" />
        )}
        <div className="flex-1">
          {title && (
            <h4 className="font-semibold mb-1">{title}</h4>
          )}
          <p className="text-sm">{message}</p>
        </div>
        {dismissible && (
          <button
            onClick={(e) => {
              const element = e.currentTarget.closest('[role="alert"]');
              if (element) element.remove();
            }}
            className="flex-shrink-0 ml-auto"
            aria-label="Dismiss"
          >
            <XCircleIcon className="w-5 h-5" />
          </button>
        )}
      </div>
    );
  },
};

export default Alert;
