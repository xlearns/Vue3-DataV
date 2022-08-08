<script setup lang="ts">
import { ref } from "vue";
withDefaults(
	defineProps<{
		tableData: any[];
		headerData: any[];
	}>(),
	{
		tableData: () => [],
		headerData: () => [],
	}
);
defineOptions({
	name: "ElTableBox",
});
</script>
<template>
	<el-table :data="tableData" style="height: 90%; width: 90%">
		<el-table-column
			:show-overflow-tooltip="true"
			:prop="item.prop"
			:label="item.label"
			:width="item.width"
			v-for="(item, index) in headerData"
			:key="index"
		/>
	</el-table>
</template>
<style lang="scss">
.el-table .el-table__row {
	background: transparent !important;
	color: #fff;
}
.el-table .el-table__header th,
.el-table .el-table__header tr {
	background: transparent !important;
	color: #fff;
}
.el-table {
	background: transparent !important;
	--el-table-row-hover-bg-color: #326dc4;
}
</style>
