<template>
  <div class="sidebar">
    <h1>{{ this.format(this.now, "HH:mm") }}</h1>
    <h2>
      {{ this.format(this.now, "dddd") }}<br />{{
        this.format(this.now, "MM/DD/YY")
      }}
    </h2>
    <div v-if="oauthState !== this.loggedInStates.LOGGED_IN">
      <div><button @click="login">Login to Google</button></div>
      <div>to display today's events</div>
    </div>
    <div v-if="oauthState === this.loggedInStates.LOGGED_IN">
      <div><button @click="logout">Logout</button></div>
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
import { defineComponent } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { endOfDay, format } from "date-fns";

import CalendarEvent from "./CalendarEvent.vue";

import * as storage from "../storage";
import { signIn } from "../auth";

import { CalendarEventRecord } from "../types";

const API_KEY = process.env.VUE_APP_CALENDAR_API_KEY;

enum LoggedInStates {
  UNKNOWN = "UNKNOWN",
  LOGGED_IN = "LOGGED_IN",
  LOGGED_OUT = "LOGGED_OUT",
  FAILED = "FAILED",
}

type Calendar = {
  summary: string;
  timeZone: string;
  items: CalendarEventRecord[];
};

type Data = {
  attemptedRelogin: boolean;
  format: typeof format;
  now: Date;
  oauthState: LoggedInStates;
  updateTimeInterval?: number;
  calendarEmail?: string;
  calendarTimeZone?: string;
  calendarEvents: CalendarEventRecord[];
  loggedInStates: typeof LoggedInStates;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const checkCast = (input: any): typeof input => input;

export default defineComponent({
  name: "CalendarContainer",
  created() {
    this.updateTimeInterval = window.setInterval(
      () => (this.now = new Date()),
      1000
    );

    storage.get("oauthToken").then((response) => {
      if (response) {
        this.oauthState = this.loggedInStates.LOGGED_IN;
        const authToken: string = checkCast(response);
        this.fetchEvents(authToken);
      } else {
        this.oauthState = this.loggedInStates.LOGGED_OUT;
      }
    });
  },
  beforeUnmount() {
    clearInterval(this.updateTimeInterval);
  },
  data(): Data {
    return {
      attemptedRelogin: false,
      format: format,
      now: new Date(),
      oauthState: LoggedInStates.UNKNOWN,
      updateTimeInterval: undefined,
      calendarEmail: undefined,
      calendarTimeZone: undefined,
      calendarEvents: [],
      loggedInStates: LoggedInStates,
    };
  },
  components: {
    CalendarEvent,
    "font-awesome-icon": FontAwesomeIcon,
  },
  methods: {
    async login() {
      try {
        const token = await signIn();
        if (token) {
          console.log(token);
          storage.set({ oauthToken: token });
          this.oauthState = this.loggedInStates.LOGGED_IN;
          this.fetchEvents(token);
        } else {
          storage.set({ oauthToken: "" });
          this.oauthState = this.loggedInStates.FAILED;
        }
      } catch (error) {
        console.error(error);
        storage.set({ oauthToken: "" });
        this.oauthState = this.loggedInStates.FAILED;
      }
    },
    logout() {
      storage.set({ oauthToken: "" });
      this.oauthState = this.loggedInStates.LOGGED_OUT;
    },
    failLogin() {
      if (!this.attemptedRelogin) {
        this.attemptedRelogin = true;
        this.login();
        return;
      }
      storage.set({ oauthToken: "" });
      this.oauthState = this.loggedInStates.FAILED;
    },
    fetchEvents(token: string) {
      if (!token) {
        throw new Error("Empty token");
      }
      const now = format(new Date(), "YYYY-MM-DD[T]HH:mm:ssZ");
      const eod = format(endOfDay(new Date()), "YYYY-MM-DD[T]HH:mm:ssZ");
      fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?orderBy=startTime&timeMin=${now}&timeMax=${eod}&singleEvents=true&key=${API_KEY}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
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
        .catch((error: Error) => {
          console.error(error);
          this.failLogin();
        });
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.sidebar {
  flex: 2;
  display: flex;
  flex-direction: column;
  text-align: right;
  min-width: 0;
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
