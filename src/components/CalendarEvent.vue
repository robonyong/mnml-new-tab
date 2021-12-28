<template>
  <div class="calendar-event">
    <div>{{ timeRange }} {{ event.summary }}</div>
    <div>
      <a v-if="!!event.hangoutLink" :href="event.hangoutLink" alt="Join Hangout"
        ><font-awesome-icon icon="video"></font-awesome-icon></a
      >&nbsp;<a :href="event.htmlLink" alt="View on Calendar"
        ><font-awesome-icon icon="external-link-alt"></font-awesome-icon
      ></a>
    </div>
    <div class="small">Location: {{ location }}</div>
    <!-- <div v-html="event.description"></div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { parse, format } from "date-fns";

import { CalendarEventRecord } from "../types";

export default defineComponent({
  components: {
    "font-awesome-icon": FontAwesomeIcon,
  },
  data() {
    return {
      parse,
      format,
    };
  },
  props: {
    event: {
      required: true,
      type: Object as PropType<CalendarEventRecord>,
    },
  },
  computed: {
    location: function (): string {
      return this.event.location || "N/A";
    },
    timeRange: function (): string {
      if (this.event.start.dateTime) {
        return `${format(parse(this.event.start.dateTime), "HH:mm")} - ${format(
          parse(this.event.end.dateTime),
          "HH:mm"
        )}`;
      }
      return "All Day";
    },
  },
});
</script>

<style scoped lang="scss">
.calendar-event {
  &:not(:last-child) {
    border-bottom: 1px solid #777;
  }
}
</style>
