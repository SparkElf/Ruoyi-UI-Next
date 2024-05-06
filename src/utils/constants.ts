/**
 * Created by 芋道源码
 *
 * 枚举类
 */

// ========== COMMON 模块 ==========
// 全局通用状态枚举
export const CommonStatusEnum = {
  ENABLE: 0, // 开启
  DISABLE: 1 // 禁用
}
export enum DICT_TYPE{
    // ========== SYSTEM 模块 ==========
    SYS_COMMON_STATUS='sys_common_status',
    // ========== BPM 模块 ==========
    BPM_MODEL_FORM_TYPE = 'bpm_model_form_type',
    BPM_TASK_CANDIDATE_STRATEGY = 'bpm_task_candidate_strategy',
    BPM_PROCESS_INSTANCE_STATUS = 'bpm_process_instance_status',
    BPM_TASK_STATUS = 'bpm_task_status',
    BPM_OA_LEAVE_TYPE = 'bpm_oa_leave_type',
    BPM_PROCESS_LISTENER_TYPE = 'bpm_process_listener_type',
    BPM_PROCESS_LISTENER_VALUE_TYPE = 'bpm_process_listener_value_type',
}