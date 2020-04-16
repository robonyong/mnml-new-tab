<template>
  <div class="calendar-event">
    <foldable>
      <div>
        <div>
          {{ format(parse(event.start.dateTime), "HH:mm") }} -
          {{ format(parse(event.end.dateTime), "HH:mm") }} {{ event.summary }}
        </div>
        <div>
          <a :href="event.hangoutLink" alt="Join Hangout"
            ><font-awesome-icon icon="video"></font-awesome-icon></a
          >&nbsp;<a :href="event.htmlLink" alt="View on Calendar"
            ><font-awesome-icon icon="external-link-alt"></font-awesome-icon
          ></a>
        </div>
        <div class="small">Location: {{ location }}</div>
        <div v-html="event.description"></div>
      </div>
    </foldable>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { parse, format } from "date-fns";

import foldable from "./Foldable.vue";

import { CalendarEventRecord } from "../types";

@Component({
  components: {
    foldable,
    "font-awesome-icon": FontAwesomeIcon
  }
})
export default class CalendarEvent extends Vue {
  @Prop(Object) event!: CalendarEventRecord;

  parse = parse;
  format = format;

  get location() {
    return this.event.location || "N/A";
  }
}
</script>

<style scoped lang="scss">
.calendar-event {
  &:not(:last-child) {
    border-bottom: 1px solid #777;
  }
}
</style>
