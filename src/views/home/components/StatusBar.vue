<template>
  <div class="status-bar">
    <div class="status-bar-dates">
      <span>{{ getDateString(props.eventData.since) }}</span>
      <span>{{ getDateString(props.eventData.until) }}</span>
    </div>
    <div :id="`${props.id}-total`" class="status-bar-progress">
      <div :id="`${props.id}-past`" class="status-bar-progress-past" />
    </div>
  </div>
  <div class="status-info">
    {{ getInfo(props.eventData) }}
  </div>
</template>

<script setup lang="ts">
import { onMounted, type PropType } from 'vue'
import type { EventType } from '../data/event.data'
import { getInfo, getDateString } from '../data/time.methods'

const props = defineProps({
  id: { type: String, required: true },
  eventData: { type: Object as PropType<EventType>, required: true }
})

const getColor = function (ratio: number) {
  const hue = ((1 - ratio) * 120).toString(10)
  return ['hsl(', hue, ',100%,50%)'].join('')
}

const getRatio = function (since: Date, until: Date): number {
  const currentTime: number = new Date(Date.now()).getTime()

  if (since.getTime() >= until.getTime() || currentTime >= until.getTime()) return 1

  if (currentTime <= since.getTime()) return 0

  const ratio: number = (currentTime - since.getTime()) / (until.getTime() - since.getTime())

  if (ratio >= 0.97) return 1

  return ratio
}

onMounted(() => {
  const totalBar = document.getElementById(`${props.id}-total`)
  const totalWidth: number = totalBar?.offsetWidth ?? 0
  const ratio = getRatio(props.eventData.since, props.eventData.until)
  const pastBar = document.getElementById(`${props.id}-past`)
  if (pastBar) {
    if (ratio >= 1) {
      pastBar.style.width = `${totalWidth}px`
      pastBar.style.borderRadius = '0.5rem'
    } else {
      pastBar.style.width = `${totalWidth * ratio}px`
    }
    pastBar.style.backgroundColor = getColor(ratio)
  }
})
</script>

<style>
.status-bar {
  width: 100%;
  margin-bottom: 1rem;
}

.status-bar * {
  transition: none;
}

.status-bar-dates {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.status-bar span {
  font-size: 0.875rem;
}

.status-bar-progress {
  width: 100%;
  height: 2rem;
  background-color: #dbdad6;
  grid: auto auto;
}

.status-bar-progress,
.status-bar-progress-past {
  border-radius: 0.5rem;
}

.status-bar-progress-past {
  height: 100%;
  border-top-right-radius: 0rem;
  border-bottom-right-radius: 0rem;
  background-color: red;
}

.status-info {
  font-size: 0.875rem;
}

@media only screen and (min-width: 1024px) {
  .status-bar {
    width: 75%;
    margin-bottom: 1rem;
  }

  .status-bar * {
    transition: none;
  }

  .status-bar-dates {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }

  .status-bar span {
    font-size: 0.875rem;
  }

  .status-bar-progress {
    width: 100%;
    height: 2rem;
    background-color: #dbdad6;
    grid: auto auto;
  }

  .status-bar-progress,
  .status-bar-progress-past {
    border-radius: 0.5rem;
  }

  .status-bar-progress-past {
    height: 100%;
    border-top-right-radius: 0rem;
    border-bottom-right-radius: 0rem;
    background-color: red;
  }

  .status-info {
    font-size: 0.875rem;
  }
}
</style>
