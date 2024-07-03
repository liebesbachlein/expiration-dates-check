<template>
  <div class="dashboard-section ssl">
    <div class="dashboard-section-name">
      {{ props.sectionName }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  routeName: { type: String, required: true },
  sectionName: { type: String, required: true }
})
</script>

<style></style>
