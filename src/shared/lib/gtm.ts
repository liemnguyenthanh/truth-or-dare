import { sendGTMEvent } from '@next/third-parties/google';

// Utility function để gửi custom events
export const trackEvent = (
  eventName: string,
  parameters?: Record<string, any>
) => {
  sendGTMEvent({
    event: eventName,
    ...parameters,
  });
};

// Predefined events cho Truth or Dare game
export const gtmEvents = {
  // Game events
  gameStart: () => trackEvent('game_start', { game_type: 'truth_or_dare' }),
  questionViewed: (questionType: 'truth' | 'dare') =>
    trackEvent('question_viewed', { question_type: questionType }),
  questionAnswered: (questionType: 'truth' | 'dare') =>
    trackEvent('question_answered', { question_type: questionType }),

  // Navigation events
  pageView: (pageName: string) =>
    trackEvent('page_view', { page_name: pageName }),

  // User interaction events
  buttonClick: (buttonName: string, location?: string) =>
    trackEvent('button_click', { button_name: buttonName, location }),

  // Custom events
  customEvent: (eventName: string, data?: Record<string, any>) =>
    trackEvent(eventName, data),
};
