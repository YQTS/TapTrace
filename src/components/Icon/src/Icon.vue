// Icon.vue
<template>
    <div>
        <span ref="elRef" :class="[$attrs.class, '-icon-default-style']" :style="getWrapStyle">
            <span class="iconify" :data-icon="symbolId"></span>
        </span>
    </div>
</template>
<script lang="ts" setup>
interface Props {
    icon: string; //icon的名字
    size?: number; //字体大小
    color?: string; //字体颜色
}
import { renderSVG } from "@iconify/iconify";
import { ref, unref, nextTick, computed, CSSProperties, watch } from "vue";
const props = withDefaults(defineProps<Props>(), {
    size: 16,
    color: "",
});

const elRef = ref<Element>();
const getWrapStyle = computed((): CSSProperties => {
    return {
        color: props.color,
        fontSize: `${props.size}px`,
    };
});

const symbolId = computed(() => props.icon)

const update = async (icon: string) => {
    const el = unref(elRef);
    if (!el) return;
    await nextTick();
    if (!icon) return
    const svg = renderSVG(icon);
    if (!svg) {
        const span = document.createElement("span");
        span.className = "iconify";
        span.dataset.icon = icon;
        el.textContent = "";
        el.appendChild(span);
    } else {
        el.textContent = "";
        el.appendChild(svg);
    }
};

watch(
    () => props.icon,
    (icon: string) => {
        update(icon)
    }
)

</script>
<style scoped>
.-icon-default-style {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
}

.-icon-default-style:hover {
    background-color: var(--icon-hover-light-color);
    cursor: pointer;
}
</style>

