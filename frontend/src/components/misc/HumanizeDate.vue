<template>
  <slot v-if="!date || date.getTime() === 0" name="placeholder">
    <span v-bind="$attrs">-</span>
  </slot>
  <NTooltip v-else trigger="hover">
    <template #trigger>
      <span v-bind="$attrs">{{ humanized }}</span>
    </template>

    <span class="whitespace-nowrap">{{ detail }}</span>
  </NTooltip>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import { NTooltip } from "naive-ui";
import type { PropType } from "vue";
import { computed } from "vue";
import { humanizeDate } from "@/utils";

const props = defineProps({
  date: {
    type: Object as PropType<Date>,
    default: undefined,
  },
  format: {
    type: String,
    default: "YYYY-MM-DD HH:mm:ss UTCZZ",
  },
});

const humanized = computed(() => humanizeDate(props.date));

const detail = computed(() =>
  dayjs(props.date?.getTime() ?? 0).format(props.format)
);
</script>
