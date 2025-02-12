// Allows access to the modal state with useContext
import { Dispatch, SetStateAction, createContext } from "react";

/**
 * Site Settings
 */
interface SiteSettings {
    description?: string;
    desktopLogo?: string;
    desktopLogoWidth?: string;
    footerText?: string;
    logo?: string;
    logoTitleText?: string;
    mobileLogo?: string;
    mobileLogoWidth?: string;
    styleguideVersion?: string;
    iosAppLink?: string;
    iosAppLogo?: string;
    androidAppLink?: string;
    androidAppLogo?: string;
    appQRCode?: string;
    title?: string;
  }
  interface ISiteSettingsContext {
    siteSettings: SiteSettings;
    setSiteSettings: Dispatch<SetStateAction<SiteSettings>>;
  }
  export const siteSettingsDefaultValue: ISiteSettingsContext = {
    siteSettings: {},
    setSiteSettings: () => false
  }
  export const siteSettingsContext = createContext<ISiteSettingsContext>(siteSettingsDefaultValue);