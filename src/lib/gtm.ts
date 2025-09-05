// Google Tag Manager events
export const gtmEvents = {
  pageView: (page: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_title: page,
        page_location: window.location.href,
      });
    }
  },

  buttonClick: (action: string, page: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'click', {
        event_category: 'button',
        event_label: action,
        page: page,
      });
    }
  },

  gameStart: () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'game_start', {
        event_category: 'game',
        event_label: 'truth_or_dare',
      });
    }
  },

  questionViewed: (type: 'truth' | 'dare') => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'question_viewed', {
        event_category: 'game',
        event_label: type,
      });
    }
  },
};
