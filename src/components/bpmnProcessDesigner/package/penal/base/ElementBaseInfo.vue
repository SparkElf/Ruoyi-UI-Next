<template>
  <div class="panel-tab__content">
    <el-form label-width="90px" :model="bpmStore.currentModel" :rules="rules">
      <div v-if="currentElementBaseInfo.$type == 'bpmn:Process'">
        <!-- 如果是 Process 信息的时候，使用自定义表单 -->

        <el-form-item label="流程标识" prop="key">
          <el-input
            v-model="bpmStore.currentModel.key"
            placeholder="请输入流标标识"
            :disabled="bpmStore.currentModel.id"
            @change="handleKeyUpdate"
          />
        </el-form-item>
        <el-form-item label="流程名称" prop="name">
          <el-input
            v-model="bpmStore.currentModel.name"
            placeholder="请输入流程名称"
            clearable
            @change="handleNameUpdate"
          />
        </el-form-item>
      </div>
      <div v-else>
        <el-form-item label="ID" prop="elId">
          <el-input v-model="currentElementBaseInfo.id" clearable @change="updateBaseInfo('id')" />
        </el-form-item>
        <el-form-item label="名称" prop="elName">
          <el-input v-model="currentElementBaseInfo.name" clearable @change="updateBaseInfo('name')" />
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { useBpmStore } from '@/store/modules/bpm';
import { ElMessage } from 'element-plus';

defineOptions({ name: 'ElementBaseInfo' })

const props = defineProps({
  businessObject: {
    type: Object,
    default: () => {}
  }
})
const bpmStore=useBpmStore()
const needProps = ref<any>({})
const bpmnElement = ref()
const currentElementBaseInfo = ref<any>({})
// 流程表单的下拉框的数据
// const forms = ref([])
// 流程模型的校验
const rules = reactive({
  id: [{ required: true, message: '流程标识不能为空', trigger: 'blur' }],
  name: [{ required: true, message: '流程名称不能为空', trigger: 'blur' }]
})

const bpmnInstances = () => (window as any)?.bpmnInstances
const resetBaseInfo = () => {
  bpmnElement.value = bpmnInstances()?.bpmnElement
  currentElementBaseInfo.value = bpmnElement.value.businessObject
  console.log(currentElementBaseInfo.value)
}
const handleKeyUpdate = (value?:string) => {
  // 校验 value 的值，只有 XML NCName 通过的情况下，才进行赋值。否则，会导致流程图报错，无法绘制的问题
  if (!value) {
    return
  }
  if (!value.match(/[a-zA-Z_][\-_.0-9a-zA-Z$]*/)) {
    ElMessage.warning('key 不满足 XML NCName 规则，所以不进行赋值')
    return
  }


  // 在 BPMN 的 XML 中，流程标识 key，其实对应的是 id 节点
  currentElementBaseInfo.value.id = value
  updateBaseInfo('id')
}
const handleNameUpdate = (value?:string) => {
  if (!value) {
    return
  }
  currentElementBaseInfo.value.name = value

  updateBaseInfo('name')

}
// const handleDescriptionUpdate=(value)=> {
// TODO 芋艿：documentation 暂时无法修改，后续在看看
// this.currentElementBaseInfo['documentation'] = value;
// this.updateBaseInfo('documentation');
// }
const updateBaseInfo = (key) => {

  // 触发 currentElementBaseInfo 对应的字段


  if (key === 'id') {

    bpmnInstances().modeling.updateProperties(toRaw(bpmnElement.value), {
      id: currentElementBaseInfo.value.id,
      di: { id: `${currentElementBaseInfo.value.id}_di` }
    })
  } else {

    bpmnInstances().modeling.updateProperties(toRaw(bpmnElement.value), {[key]:currentElementBaseInfo.value[key]})//同步到流程图节点上
  }
}

onMounted(() => {
  // 针对上传的 bpmn 流程图时，需要延迟 1 毫秒的时间，保证 key 和 name 的更新
  setTimeout(() => {
    handleKeyUpdate(bpmStore.currentModel.key)
    handleNameUpdate(bpmStore.currentModel.name)
  }, 110)
})

watch(
  () => props.businessObject,
  (val) => {
    if (val) {
      resetBaseInfo()
    }
  }
)

watch(
  () => bpmStore.currentModel.key,
  (val) => {
    // 针对上传的 bpmn 流程图时，保证 key 和 name 的更新
    if (val) {
      handleKeyUpdate(bpmStore.currentModel.key)
      handleNameUpdate(bpmStore.currentModel.name)
    }
  }
)

onBeforeUnmount(() => {
  bpmnElement.value = null
})
</script>
