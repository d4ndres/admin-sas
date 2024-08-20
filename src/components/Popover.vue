<script setup>
const showPopover = ref(false)
const componentRef = getCurrentInstance();

const isGreaterThanScreenWidth = ref(false)
function getScrollableParent(element) {
  let parent = element.parentElement;
  while (parent) {
    const overflowX = window.getComputedStyle(parent).overflowX;
    if (parent.scrollWidth > parent.clientWidth && (overflowX === 'scroll' || overflowX === 'auto')) {
      return parent;
    }
    parent = parent.parentElement;
  }
  return document.documentElement;
}

watch(showPopover, () => {
  nextTick(() => {
    const scrollableParent = getScrollableParent(componentRef.vnode.el);
    isGreaterThanScreenWidth.value = scrollableParent.clientWidth <
      componentRef.vnode.el.getBoundingClientRect().right -
      scrollableParent.getBoundingClientRect().left +
      scrollableParent.scrollLeft +
      componentRef.vnode.el.lastChild.offsetWidth;
  });
});

const handleClickOutside = (event) => {
  if(!componentRef.vnode.el.contains(event.target)) {
    showPopover.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});




</script>

<template>
  <div class="relative" @click="showPopover = true">
    <slot name="default" :showPopover="showPopover">

    </slot>
    <div v-show="showPopover" class="
    fixed md:absolute 
    w-full md:w-fit 
    left-0 md:left-auto
    md:bottom-auto 
    bottom-0 md:top-full
    shadow-[0_0_0px_100vh_#000000CC] md:shadow-none 
    z-50
    " :class="{ 'right-0' : isGreaterThanScreenWidth }">
      <slot name="popover"></slot>
    </div>
  </div>
</template>