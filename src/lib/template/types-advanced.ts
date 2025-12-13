// Header Template Types
export interface HeaderTemplate {
  id: string;
  templateName: string;
  category: 'minimal' | 'standard' | 'advanced' | 'luxury';
  zones: {
    topBar?: {
      enabled: boolean;
      backgroundColor: string;
      textColor: string;
      height: string;
      content?: {
        left?: string;  // "Free shipping over $50"
        center?: string;
        right?: string; // "Track Order | Help"
      };
    };
    mainHeader: {
      layout: 'left-center-right' | 'center' | 'split' | 'stacked';
      backgroundColor: string;
      textColor: string;
      height: string;
      sticky: boolean;
      shadow: boolean;
      logo: {
        position: 'left' | 'center';
        maxWidth: string;
        maxHeight: string;
      };
      navigation: {
        position: 'center' | 'left' | 'right';
        style: 'horizontal' | 'vertical';
        alignment: 'start' | 'center' | 'end';
        spacing: string;
        fontSize: string;
        fontWeight: string;
        hoverEffect: 'underline' | 'background' | 'color' | 'none';
        activeIndicator: boolean;
      };
      actions: {
        position: 'right' | 'left';
        items: Array<'search' | 'account' | 'wishlist' | 'cart' | 'language' | 'currency'>;
        iconSize: string;
        showLabels: boolean;
        cartBadge: boolean;
      };
    };
    megaMenu?: {
      enabled: boolean;
      style: 'dropdown' | 'fullwidth' | 'sidebar';
      backgroundColor: string;
      columns: number;
      showImages: boolean;
      showDescription: boolean;
    };
    mobileMenu: {
      style: 'drawer' | 'fullscreen' | 'dropdown';
      position: 'left' | 'right';
      backgroundColor: string;
      showSearch: boolean;
      showCategories: boolean;
    };
  };
  settings: {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      text: string;
      border: string;
    };
    spacing: 'compact' | 'normal' | 'spacious';
    borderRadius: 'none' | 'small' | 'medium' | 'large';
    breakpoint: 'md' | 'lg';
    maxWidth: 'full' | 'container' | 'narrow';
    transparency: boolean;
    blur: boolean;
  };
}

// Footer Template Types
export interface FooterTemplate {
  id: string;
  templateName: string;
  category: 'minimal' | 'standard' | 'advanced' | 'luxury';
  zones: {
    topSection?: {
      enabled: boolean;
      layout: 'single' | 'two-column' | 'three-column' | 'four-column';
      backgroundColor: string;
      padding: string;
      columns: Array<{
        id: string;
        title: string;
        type: 'links' | 'newsletter' | 'contact' | 'social' | 'custom';
        content?: any;
      }>;
    };
    middleSection?: {
      enabled: boolean;
      showLogo: boolean;
      showDescription: boolean;
      showSocial: boolean;
      showPaymentMethods: boolean;
      backgroundColor: string;
      padding: string;
    };
    bottomSection: {
      enabled: boolean;
      layout: 'single-line' | 'two-line' | 'split';
      backgroundColor: string;
      textColor: string;
      padding: string;
      copyright: {
        text: string;
        position: 'left' | 'center' | 'right';
      };
      links?: Array<{
        label: string;
        url: string;
      }>;
      showLanguageSelector: boolean;
      showCurrencySelector: boolean;
    };
  };
  settings: {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
      border: string;
    };
    spacing: 'compact' | 'normal' | 'spacious';
    borderRadius: 'none' | 'small' | 'medium' | 'large';
    dividers: boolean;
    maxWidth: 'full' | 'container';
  };
}

// Sidebar Template Types
export interface SidebarTemplate {
  id: string;
  templateName: string;
  category: 'minimal' | 'standard' | 'advanced' | 'luxury';
  zones: {
    header?: {
      enabled: boolean;
      title: string;
      showCloseButton: boolean;
      backgroundColor: string;
      textColor: string;
    };
    filters?: {
      enabled: boolean;
      layout: 'accordion' | 'stacked' | 'tabs';
      showSearch: boolean;
      collapsible: boolean;
      defaultExpanded: boolean;
      sections: Array<{
        id: string;
        type: 'categories' | 'price' | 'brands' | 'colors' | 'sizes' | 'ratings' | 'custom';
        title: string;
        enabled: boolean;
      }>;
    };
    quickLinks?: {
      enabled: boolean;
      title: string;
      links: Array<{
        label: string;
        url: string;
        icon?: string;
      }>;
    };
    promotion?: {
      enabled: boolean;
      type: 'banner' | 'card';
      content: string;
      image?: string;
      backgroundColor: string;
    };
  };
  settings: {
    width: 'narrow' | 'normal' | 'wide';
    position: 'left' | 'right';
    backgroundColor: string;
    textColor: string;
    spacing: 'compact' | 'normal' | 'spacious';
    borderRadius: 'none' | 'small' | 'medium' | 'large';
    shadow: boolean;
    overlay: boolean;
  };
}
