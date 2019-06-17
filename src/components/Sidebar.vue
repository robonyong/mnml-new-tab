<template>
  <div class="sidebar">
    <h1>{{ this.format(this.now, "HH:mm") }}</h1>
    <h2>
      {{ this.format(this.now, "dddd") }}<br />{{
        this.format(this.now, "MM/DD/YY")
      }}
    </h2>
    <div v-if="oauthState !== LoggedInStates.LOGGED_IN">
      <div><button @click="login">Login to Google</button></div>
      <div>to display today's events</div>
    </div>
    <div v-if="oauthState === LoggedInStates.LOGGED_IN">
      <div v-if="calendarEvents.length === 0">
        No more scheduled events today
        <font-awesome-icon icon="glass-cheers" size="xs" />
      </div>
      <CalendarEvent
        v-for="item in calendarEvents"
        :key="item.id"
        :event="item"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from "vue-property-decorator";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { endOfDay, format } from "date-fns";

import CalendarEvent from "./CalendarEvent.vue";

import * as storage from "../storage";

import { CalendarEventRecord } from "../types";

const API_KEY = process.env.VUE_APP_CALENDAR_API_KEY;

enum LoggedInStates {
  UNKNOWN = "UNKNOWN",
  LOGGED_IN = "LOGGED_IN",
  LOGGED_OUT = "LOGGED_OUT",
  FAILED = "FAILED"
}

type Calendar = {
  summary: String;
  timeZone: String;
  items: CalendarEventRecord[];
};

@Component({
  components: {
    CalendarEvent,
    "font-awesome-icon": FontAwesomeIcon
  }
})
export default class Sidebar extends Vue {
  format = format;
  now = new Date();
  oauthState = LoggedInStates.UNKNOWN;
  updateTimeInterval?: number;
  calendarEmail?: String;
  calendarTimeZone?: String;
  calendarEvents: CalendarEventRecord[] = [];

  LoggedInStates = LoggedInStates;

  created() {
    this.updateTimeInterval = window.setInterval(
      () => (this.now = new Date()),
      1000
    );

    storage.get("oauthToken").then(response => {
      if (response) {
        this.oauthState = LoggedInStates.LOGGED_IN;
        this.fetchEvents();
      } else {
        this.oauthState = LoggedInStates.LOGGED_OUT;
      }
    });
  }

  beforeDestroy() {
    clearInterval(this.updateTimeInterval);
  }

  login() {
    chrome.identity.getAuthToken({ interactive: true }, token => {
      if (token) {
        storage.set({ oauthToken: token });
        this.oauthState = LoggedInStates.LOGGED_IN;
        this.fetchEvents();
      } else {
        storage.set({ oauthToken: "" });
        this.oauthState = LoggedInStates.FAILED;
      }
    });
  }

  fetchEvents() {
    storage.get("oauthToken").then(token => {
      const now = format(new Date(), "YYYY-MM-DD[T]HH:mm:ssZ");
      const eod = format(endOfDay(new Date()), "YYYY-MM-DD[T]HH:mm:ssZ");
      fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?orderBy=startTime&timeMin=${now}&timeMax=${eod}&singleEvents=true&key=${API_KEY}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      )
        .then((response: Response) => {
          if (!response.ok) {
            throw new Error(
              `Request failed with ${response.status} - ${response.statusText}`
            );
          }
          return response.json();
        })
        .then((calendar: Calendar) => {
          this.calendarEmail = calendar.summary;
          this.calendarTimeZone = calendar.timeZone;
          this.calendarEvents = calendar.items;
        })
        .catch(error => {
          console.error(error);
          this.login();
        });
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.sidebar {
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: right;
}

button {
  background: transparent;
  text-decoration: underline;
  border: none;
  color: inherit;
  padding: 0;
  cursor: pointer;

  &:hover {
    text-decoration: none;
  }
}
</style>
