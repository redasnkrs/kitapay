window.klaroConfig = {
  elementID: 'klaro',
  storageMethod: 'cookie',
  storageName: 'klaro',
  htmlTexts: false,
  // cookieDomain: 'kitapay.de',
  cookieName: 'klaroConsent',
  default: false, // default consent state
  mustConsent: false, // blocking user
  acceptAll: true,
  lang: 'de',
  privacyPolicy: 'datenschutz.html',
  services: [
    {
      name: 'google-tag-manager',
      required: false,
      purposes: ['marketing'],
      onAccept: `
        for(let k of Object.keys(opts.consents)){
          if (opts.consents[k]){
            let eventName = 'klaro-'+k+'-accepted'
            dataLayer.push({'event': eventName})
          }
        }
      `,
      onInit: `
        window.dataLayer = window.dataLayer || [];
        window.gtag = function(){dataLayer.push(arguments)}
        gtag('consent', 'default', {'ad_storage': 'denied', 'analytics_storage': 'denied', 'ad_user_data': 'denied', 'ad_personalization': 'denied'})
        gtag('set', 'ads_data_redaction', true)
      `,
    },
    { // if needed
      name: 'google-analytics',
      cookies: [
        /^_ga(_.*)?/ // delete the Google Analytics cookies if the user declines its use
      ],
      purposes: ['marketing'],
      onAccept: `
        gtag('consent', 'update', {
          'analytics_storage': 'granted',
        })
      `,
      onDecline: `
        gtag('consent', 'update', {
          'analytics_storage': 'denied',
        })
      `,
    },
    { // if needed
      name: 'google-ads',
      cookies: [],
      onAccept: `
        gtag('consent', 'update', {
          'ad_storage': 'granted',
          'ad_user_data': 'granted',
          'ad_personalization': 'granted'
        })
      `,
      onDecline: `
        gtag('consent', 'update', {
          'ad_storage': 'denied',
          'ad_user_data': 'denied',
          'ad_personalization': 'denied'
        })
      `,
      purposes: ['marketing'],
    }
  ],
  translations: {
    en: {
      consentModal: {
        title: 'We use cookies',
        description: 'This site uses cookies for advertising. You can choose what to allow.',
      },
      purposes: {
        marketing: 'Google',
      }
    },
    de: {
      consentModal: {
        title: 'Wir verwenden Cookies',
        description: 'Diese Website verwendet Cookies für Werbung. Sie können auswählen, welche Sie zulassen möchten.',
      },
      purposes: {
        marketing: 'Google',
      }
    },
  }
}

// init klaro
window.klaro.setup();
