<script setup lang="ts">
interface SectionProps {
  scroll?: number
  card?: boolean
  classname?: string | string[] | Record<string, boolean>
}

const props = withDefaults(defineProps<SectionProps>(), {
  scroll: 0.5,
  card: false,
  classname: "",
})

const emit = defineEmits(["update:scrolled"])

const scrolled = ref(false)
const sectionRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      if (entry?.isIntersecting && !scrolled.value) {
        scrolled.value = true
        emit("update:scrolled", true)
        observer?.unobserve(entry.target)
      }
    },
    {
      threshold: (props.scroll >= 0 && props.scroll < 1) ? props.scroll : 0.5,
    },
  )

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
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
      { card },
      classname,
    ]"
  >
    <div
      v-if="$slots.title"
      class="title"
    >
      <span :class="{ scrolled }">
        <slot name="title" />
      </span>
    </div>
    <slot :scrolled="scrolled" />
  </div>
</template>

<style scoped>
.section {
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
}

.title {
  position: relative;
  width: 100%;
  padding: 0;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 4px;
    width: 100%;
    height: 4px;
    border-radius: 2px;
    background-color: var(--text);
  }

  & span {
    width: 100%;
    margin-bottom: 1rem;
    color: var(--text-light);
    font-size: var(--title-size);
    transform: translateX(5%);
    opacity: 0;
    transition: all 0.3s ease;
    display: block;

    &.scrolled {
      transform: translateX(0);
      opacity: 1;
    }
  }
}

@media (min-width: 768px) {
  .card {
    &:hover {
      background-color: var(--bg-light);
    }
  }
}
</style>
