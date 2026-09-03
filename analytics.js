(() => {
  const productionHost = /(^|\.)mariaandmario\.com$/i.test(location.hostname);
  if (!productionHost || window.__mmPostHogInit) return;
  window.__mmPostHogInit = true;

  const POSTHOG_KEY = 'phc_C6W8f4G8St4gYzWhCdn5N4nnvaR5RiYX6B54UxLCF6RM';
  const POSTHOG_HOST = 'https://eu.i.posthog.com';
  const SITE = 'mariaandmario';

  const cleanCurrentUrl = (value) => {
    if (!value) return value;
    try {
      const url = new URL(String(value), location.origin);
      return `${url.origin}${url.pathname}`;
    } catch {
      return String(value).split(/[?#]/)[0];
    }
  };

  const cleanReferrer = (value) => {
    if (!value) return value;
    try { return new URL(String(value), location.origin).origin; }
    catch { return ''; }
  };

  !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split('.');2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement('script')).type='text/javascript',p.crossOrigin='anonymous',p.async=!0,p.src=s.api_host.replace('.i.posthog.com','-assets.i.posthog.com')+'/static/array.js',(r=t.getElementsByTagName('script')[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a='posthog',u.people=u.people||[],u.toString=function(t){var e='posthog';return'posthog'!==a&&(e+='.'+a),t||(e+=' (stub)'),e},u.people.toString=function(){return u.toString(1)+'.people (stub)'},o='init capture register register_once unregister identify set_config reset opt_out_capturing opt_in_capturing has_opted_out_capturing has_opted_in_capturing get_property get_distinct_id alias isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures get_surveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep'.split(' '),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);

  window.posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    defaults: '2026-05-30',
    autocapture: false,
    capture_pageview: true,
    capture_pageleave: true,
    capture_dead_clicks: false,
    capture_exceptions: false,
    capture_heatmaps: false,
    capture_performance: true,
    disable_persistence: true,
    disable_session_recording: true,
    disable_surveys: true,
    person_profiles: 'identified_only',
    respect_dnt: true,
    advanced_disable_flags: true,
    before_send: (event) => {
      if (!event?.properties) return event;
      event.properties.site = SITE;
      ['$current_url', '$initial_current_url'].forEach((key) => {
        if (event.properties[key]) event.properties[key] = cleanCurrentUrl(event.properties[key]);
      });
      ['$referrer', '$initial_referrer'].forEach((key) => {
        if (event.properties[key]) event.properties[key] = cleanReferrer(event.properties[key]);
      });
      return event;
    },
    loaded: (posthog) => posthog.register({ site: SITE })
  });

  const capture = (event, properties = {}) => {
    if (typeof window.posthog?.capture !== 'function') return;
    window.posthog.capture(`mariaandmario_${event}`, { site: SITE, ...properties });
  };

  const attach = () => {
    document.addEventListener('click', (event) => {
      const language = event.target.closest?.('[data-lang-select]')?.dataset.langSelect;
      if (language === 'en' || language === 'bg') capture('language_selected', { language });
      if (event.target.closest?.('#yesBtn')) capture('invitation_yes');
      if (event.target.closest?.('#noBtn')) capture('invitation_no');
      if (event.target.closest?.('#enterWorldBtn')) capture('celebration_entered');
      if (event.target.closest?.('#playJourneyBtn')) capture('theme_played');
      if (event.target.closest?.('#pauseJourneyBtn')) capture('theme_paused');
    }, true);

    document.getElementById('rsvpForm')?.addEventListener('submit', () => capture('rsvp_submitted'));
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', attach, { once: true });
  else attach();
})();
