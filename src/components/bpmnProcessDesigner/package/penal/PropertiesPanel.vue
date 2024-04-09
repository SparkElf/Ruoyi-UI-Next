<template>
  <div class="process-panel__container" :style="{ width: `${width}px` }">
    <el-collapse v-model="activeTab">
      <el-collapse-item name="base">
        <!-- class="panel-tab__title" -->
        <template #title>
          <ElIcon icon="ep:info-filled" ><IconInfoFilled></IconInfoFilled></ElIcon>
          常规</template
        >
        <ElementBaseInfo/>
      </el-collapse-item>
      <!-- <el-collapse-item name="condition" v-if="elementType === 'Process'" key="message">
        <template #title><Icon icon="ep:comment" />消息与信号</template>
        <signal-and-massage />
      </el-collapse-item>
      <el-collapse-item name="condition" v-if="conditionFormVisible" key="condition">
        <template #title><Icon icon="ep:promotion" />流转条件</template>
        <flow-condition :business-object="elementBusinessObject" :type="elementType" />
      </el-collapse-item>
      <el-collapse-item name="condition" v-if="formVisible" key="form">
        <template #title><Icon icon="ep:list" />表单</template>
        <element-form :id="elementId" :type="elementType" />
      </el-collapse-item>
      <el-collapse-item name="task" v-if="elementType.indexOf('Task') !== -1" key="task">
        <template #title><Icon icon="ep:checked" />任务（审批人）</template>
        <element-task :id="elementId" :type="elementType" />
      </el-collapse-item>
      <el-collapse-item
        name="multiInstance"
        v-if="elementType.indexOf('Task') !== -1"
        key="multiInstance"
      >
        <template #title><Icon icon="ep:help-filled" />多实例（会签配置）</template>
        <element-multi-instance :business-object="elementBusinessObject" :type="elementType" />
      </el-collapse-item>
      <el-collapse-item name="listeners" key="listeners">
        <template #title><Icon icon="ep:bell-filled" />执行监听器</template>
        <element-listeners :id="elementId" :type="elementType" />
      </el-collapse-item>
      <el-collapse-item name="taskListeners" v-if="elementType === 'UserTask'" key="taskListeners">
        <template #title><Icon icon="ep:bell-filled" />任务监听器</template>
        <user-task-listeners :id="elementId" :type="elementType" />
      </el-collapse-item>
      <el-collapse-item name="extensions" key="extensions">
        <template #title><Icon icon="ep:circle-plus-filled" />扩展属性</template>
        <element-properties :id="elementId" :type="elementType" />
      </el-collapse-item>
      <el-collapse-item name="other" key="other">
        <template #title><Icon icon="ep:promotion" />其他</template>
        <element-other-config :id="elementId" />
      </el-collapse-item> -->
    </el-collapse>
  </div>
</template>
<script lang="ts" setup>
import ElementBaseInfo from './base/ElementBaseInfo.vue'
// import ElementOtherConfig from './other/ElementOtherConfig.vue'
// import ElementTask from './task/ElementTask.vue'
// import ElementMultiInstance from './multi-instance/ElementMultiInstance.vue'
// import FlowCondition from './flow-condition/FlowCondition.vue'
// import SignalAndMassage from './signal-message/SignalAndMessage.vue'
// import ElementListeners from './listeners/ElementListeners.vue'
// import ElementProperties from './properties/ElementProperties.vue'
// import UserTaskListeners from './listeners/UserTaskListeners.vue'
import { useBpmStore } from '@/store/modules/bpm'
import BpmnModeler from 'bpmn-js/lib/Modeler'
import type { Element } from 'bpmn-js/lib/model/Types'
import { ElIcon } from 'element-plus';
defineOptions({ name: 'MyPropertiesPanel' })

/**
 * 侧边栏
 * @Author MiyueFE
 * @Home https://github.com/miyuesc
 * @Date 2021年3月31日18:57:51
 */
const props = defineProps({
  bpmnModeler: {
    type: BpmnModeler,
    default: () => {}
  },
  prefix: {
    type: String,
    default: 'camunda'
  },
  width: {
    type: Number,
    default: 480
  },
  idEditDisabled: {
    type: Boolean,
    default: false
  }
})

const activeTab = ref('base')
const elementId = ref('')
const elementType = ref('')

const conditionFormVisible = ref(false) // 流转条件设置
const formVisible = ref(false) // 表单配置

const bpmStore=useBpmStore()
provide('prefix', props.prefix)
provide('width', props.width)
const bpmnInstances = () => (window as any)?.bpmnInstances

// 监听 props.bpmnModeler 然后 initModels
const unwatchBpmn = watch(
  () => bpmStore.bpmnModeler,
  () => {
    // 避免加载时 流程图 并未加载完成
    if (!bpmStore.bpmnModeler) {
      console.log('缺少props.bpmnModeler')
      return
    }

    bpmStore.bpmnInstances = {
      modeler: bpmStore.bpmnModeler,
      modeling: bpmStore.bpmnModeler.get('modeling'),
      moddle: bpmStore.bpmnModeler.get('moddle'),
      eventBus: bpmStore.bpmnModeler.get('eventBus'),
      bpmnFactory: bpmStore.bpmnModeler.get('bpmnFactory'),
      elementFactory: bpmStore.bpmnModeler.get('elementFactory'),
      elementRegistry: bpmStore.bpmnModeler.get('elementRegistry'),
      replace: bpmStore.bpmnModeler.get('replace'),
      selection: bpmStore.bpmnModeler.get('selection')
    }


    getActiveElement()
    unwatchBpmn()
  },
  {
    immediate: true
  }
)

const getActiveElement = () => {
  // 初始第一个选中元素 bpmn:Process

  bpmStore.bpmnModeler?.on('import.done', (e) => {
    init(null)
  })
  // 监听选择事件，修改当前激活的元素以及表单
  bpmStore.bpmnModeler?.on('selection.changed', ({ newSelection }) => {
    init(newSelection[0] || null)
  })
  bpmStore.bpmnModeler?.on('element.changed', ({ element }) => {
    // 保证 修改 "默认流转路径" 类似需要修改多个元素的事件发生的时候，更新表单的元素与原选中元素不一致。
    if (element && element.id === elementId.value) {
      init(element)
    }
  })
}
// 初始化数据
const init = (element:Element|null) => {
  let activatedElement = element
  if (!activatedElement) {
    bpmStore.bpmnElement =
      bpmStore.bpmnInstances?.elementRegistry.find((el) => el.type === 'bpmn:Process') ??
      bpmStore.bpmnInstances?.elementRegistry.find((el) => el.type === 'bpmn:Collaboration')
      return
  }


  bpmStore.bpmnElement=activatedElement
  elementId.value = activatedElement.id
  elementType.value = activatedElement.type.split(':')[1] || ''
  // conditionFormVisible.value = !!(
  //   elementType.value === 'SequenceFlow' &&
  //   activatedElement.source &&
  //   activatedElement.source.type.indexOf('StartEvent') === -1
  // )
  // formVisible.value = elementType.value === 'UserTask' || elementType.value === 'StartEvent'
}

onBeforeUnmount(() => {
  bpmStore.bpmnInstances = undefined
})

// watch(
//   () => elementId.value,
//   () => {
//     activeTab.value = 'base'
//   }
// )
</script>
