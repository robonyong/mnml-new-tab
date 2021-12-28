export type TodoRecord = {
  id: string;
  text: string;
  completed: boolean;
};

export type CalendarEventRecord = {
  id: string;
  summary: string;
  description: string;
  location: string;
  hangoutLink: string;
  htmlLink: string;
  organizer: {
    id: string;
    email: string;
    displayName: string;
    self: boolean;
  };
  start: {
    date: string;
    dateTime: string;
    timeZone: string;
  };
  end: {
    date: string;
    dateTime: string;
    timeZone: string;
  };
};
