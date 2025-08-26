import React, { useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { isIOS, isAndroid, isSafari } from 'mobile-device-detect';

// SmartBanner React Component
const SmartBannerComponent = ({ 
  title = "Connexus CU Mobile App",
  author = "Connexus Credit Union", 
  price = "FREE",
  appStoreLanguage = "us",
  inAppStore = "On the App Store",
  inGooglePlay = "In Google Play",
  inAmazonAppStore = "In Amazon Appstore",
  inWindowsStore = "In Windows Store",
  GooglePlayParams = "",
  appMeta = {},
  button = "VIEW",
  url = "",
  enableWinJS = false,
  daysHidden = 15,
  daysReminder = 90,
  force = "",
  hideOnInstall = true,
  layer = false,
  iOSUniversalApp = true,
  appendToSelector = "body",
  iconGloss = null,
  position = "top"
}) => {
  const bannerRef = useRef(null);

  const [cookies, setCookie ] = useCookies(['ismember']);
  useEffect(() => {

    const SmartBanner = function() {
      const cookie = {
        set: function(name, value, days) {
          let expires = "";
          if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
          }
          document.cookie = name + "=" + value + expires + "; path=/";
        },
        get: function(name) {
          const nameEQ = name + "=";
          const ca = document.cookie.split(';');
          for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
          }
          return null;
        },
        erase: function(name) {
          this.set(name, "", -1);
        }
      };

      // const ua = navigator.userAgent;
      // const isIOS = /iPhone|iPad|iPod/i.test(ua);
      // const isAndroid = /Android/i.test(ua);

      if (cookie.get('sb-closed') || cookie.get('sb-installed')) {
        return;
      }

      const platform = isIOS ? 'ios' : isAndroid ? 'android' : '';
      
      if (!platform && !force) return;

      const meta = document.querySelector('meta[name="smartbanner:' + platform + ':url"]') ||
                  document.querySelector('meta[name="smartbanner:url"]');
      
      if (!meta && !url) return;

      const link = meta ? meta.getAttribute('content') : url;
      
      // Create banner HTML
      const bannerHTML = `
        <div class="smartbanner smartbanner-${platform} smartbanner-${position}">
          <div class="smartbanner-container">
            <a href="#" class="smartbanner-close" onclick="closeBanner()">&times;</a>
            <span class="smartbanner-icon" style="background-image: url(${getIcon(platform)})"></span>
            <div class="smartbanner-info">
              <div class="smartbanner-title">${title}</div>
              <div class="smartbanner-author">${author}</div>
              <div class="smartbanner-description">${getStoreText(platform)}</div>
            </div>
            <a href="${link}" class="smartbanner-button">
              <span class="smartbanner-button-text">${button}</span>
            </a>
          </div>
        </div>
      `;

      function getIcon(platform) {
        const iconMeta = document.querySelector(`meta[name="smartbanner:${platform}:icon"]`) ||
                        document.querySelector('meta[name="smartbanner:icon"]');
        return iconMeta ? iconMeta.getAttribute('content') : '/images/logos/app-store-512x512bb.jpg';
      }

      function getStoreText(platform) {
        switch (platform) {
          case 'ios': return inAppStore;
          case 'android': return inGooglePlay;
          case 'kindle': return inAmazonAppStore;
          case 'windows': return inWindowsStore;
          default: return price;
        }
      }

      if(cookies.ismember === 'true') {

        // Add banner to body
        const bannerElement = document.createElement('div');
        bannerElement.innerHTML = bannerHTML;
        const banner = bannerElement.firstElementChild;
        // Push body content down when banner is at top
        if (position === 'top') {
          document.body.classList.add('smartbanner-push-body');
          document.querySelector('.cx-header').classList.add('smartbanner-push-body');
        }

        // Close functionality
        window.closeBanner = function() {
          banner.remove();
          document.body.classList.remove('smartbanner-push-body');
          document.querySelector('.cx-header').classList.remove('smartbanner-push-body');
          cookie.set('sb-closed', 'true', daysHidden);
        };

        // Add click tracking
        banner.querySelector('.smartbanner-button').addEventListener('click', function() {
          if (hideOnInstall) {
            cookie.set('sb-installed', 'true', daysReminder);
          }
        });

        document.querySelector('.cx-header').insertBefore(banner, document.querySelector('.cx-header').firstChild);
      }
    };

    const banner = SmartBanner();
    
    return () => {
      // Cleanup body class
      document.body.classList.remove('smartbanner-push-body');
    };
  }, []);

  return null; 
};

export default SmartBannerComponent;