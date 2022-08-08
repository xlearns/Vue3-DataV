<script setup lang="ts">
withDefaults(
	defineProps<{
		color?: string;
		width?: string;
		height?: string;
		time?: string;
	}>(),
	{
		color: "#00ffff",
		width: "30px",
		height: "100%",
		time: "2s",
	}
);

defineOptions({
	name: "ElScanBox",
});
</script>
<template>
	<div class="container-title-scanning"><slot /></div>
</template>
<style lang="scss" scoped>
.container-title-scanning {
	display: inline-block;
	position: relative;
	overflow: hidden;
	z-index: 0;
	&::after {
		content: " ";
		display: block;
		position: absolute;
		top: 0;
		width: v-bind(width);
		height: v-bind(height);
		z-index: -1;
		background-image: linear-gradient(
			to right,
			transparent 0%,
			v-bind(color) 100%
		);
		animation: scanning v-bind(time) infinite linear;
		opacity: 0.7;
	}
}

@keyframes scanning {
	0% {
		left: 0;
		opacity: 0.7;
	}
	90% {
		left: 100%;
		opacity: 0.3;
	}
	100% {
		right: -20px;
		opacity: 0;
	}
}
</style>
