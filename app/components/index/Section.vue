<script setup lang="ts">
interface SectionProps {
  scroll?: number
  card?: boolean
  classname?: string | string[] | Record<string, boolean>
}

const props = defineProps<SectionProps>()

const isLoaded = ref(false)
const scrolled = ref(false)
const sectionRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      if (entry?.isIntersecting && !scrolled.value) {
        scrolled.value = true
        observer?.unobserve(entry.target)
      }
    },
    {
      threshold: (props.scroll && props.scroll >= 0 && props.scroll < 1) ? props.scroll : 0.5,
    },
  )

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }

  isLoaded.value = true
})

onUnmounted(() => {
  if (observer && sectionRef.value) {
    observer.unobserve(sectionRef.value)
  }
})
</script>

<template>
  <div
    ref="sectionRef"
    class="section"
    :class="[
      { card: card },
      classname,
    ]"
  >
    <slot
      v-if="isLoaded"
      :scrolled="scrolled"
    />
  </div>
</template>

<style scoped>
.section {
  display: flex;
  border-radius: 1rem;
}

@media (min-width: 768px) {
  .card {
    &:hover {
      background-color: var(--bg-light);
    }
  }
}
</style>
