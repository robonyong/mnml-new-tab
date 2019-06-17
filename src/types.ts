export type TodoRecord = {
  id: String;
  text: String;
  completed: Boolean;
};

export type CalendarEventRecord = {
	id: String;
	summary: String;
	description: String;
	location: String;
	hangoutLink: String;
	htmlLink: String;
	organizer: {
    id: String,
    email: String,
    displayName: String,
    self: Boolean
  },
  start: {
    date: String;
    dateTime: String;
    timeZone: String;
  },
  end: {
    date: String;
    dateTime: String;
    timeZone: String;
  },
}