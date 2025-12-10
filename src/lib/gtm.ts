function pushToDataLayer(event: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  const win = window as unknown as {
    dataLayer?: Array<Record<string, unknown>>;
  };
  win.dataLayer = win.dataLayer || [];
  win.dataLayer.push({
    event,
    ...params,
  });
}

// Google Tag Manager events (push to dataLayer)
export const gtmEvents = {
  pageView: (page: string) =>
    pushToDataLayer('page_view', {
      page_title: page,
      page_location: typeof window !== 'undefined' ? window.location.href : '',
    }),

  buttonClick: (action: string, page: string) =>
    pushToDataLayer('button_click', {
      event_category: 'button',
      event_label: action,
      page,
    }),

  gameStart: () =>
    pushToDataLayer('game_start', {
      event_category: 'game',
      event_label: 'truth_or_dare',
    }),

  questionViewed: (type: 'truth' | 'dare') =>
    pushToDataLayer('question_viewed', {
      event_category: 'game',
      event_label: type,
    }),
};
