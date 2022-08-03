#!/bin/sh  
clear
read -p "input component name:" filename

echo "creating a component named $filename";
mkdir ./packages/components/$filename;
mkdir ./packages/components/$filename/src;
touch ./packages/components/$filename/index.ts;
touch ./packages/components/$filename/src/index.vue;

cd ./packages/components
echo "export * from './$filename';" >> index.ts;

cat > ./$filename/index.ts <<EOF
import { withInstall } from '@datav/utils';
import $filename from './src/index.vue';
export const El$filename = withInstall($filename);
export default El$filename;
EOF

cat > ./$filename/src/index.vue <<EOF
<script setup lang='ts'>
import {ref} from 'vue';
defineOptions({
  name:'El$filename'
})
const msg = ref('hello word');
</script>
<template>
{{msg}}
</template>
EOF

cd ./../datav

sed -i "1i import { El$filename } from '@datav/components/$filename'" components.ts;

find -name components.ts | xargs perl -pi -e "s|]|,El$filename]|g"

echo "Done creating: $filename component";