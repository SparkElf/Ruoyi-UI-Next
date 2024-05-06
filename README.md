版本更改
1. 优化路由
- 每个路由的name都设置为uuid，否则路径排序时/test/subtest路径在/test和/test/subtest路由都存在的情况下会匹配到/test
- 路由的组件不能是Layout，以简化路由逻辑
- 支持菜单作为一级目录，也可以拥有页面

模块配置
1. bpm
- 字典
    - OA请假类型 bpm_oa_leave_type 病假 1 事假 2 婚假 3
    - 流程实例状态 bpm_process_instance_status 审批中 1 审批通过 2 审批不通过3 已取消4
    - 流程表单类型 bpm_model_form_type 流程表单10 业务表单20
    - 任务分配规则的类型 bpm_task_assign_rule_type 角色10 部门成员20 部门负责人21 用户30 用户组40 自定义脚本50 岗位22
    - 任务分配自定义脚本 bpm_task_assign_script 流程发起人10 流程发起人的一级领导20 流程发起人的二级领导21
    - 流程实例的结果 bpm_task_status 审批中1 审批通过2 审批不通过3 已取消4 已退回5 委派中6 待审批0
    - 流程实例监听器类型 bpm_process_listener_type 执行监听器 'execution' 任务监听器 'task'
    - 流程实例监听器值 bpm_process_listener_value_type 表达式 'expression' 代理表达式 'delegateExpression'
- 菜单
    - 流程表单 bpm/form/index
    - 流程模型 bpm/model/index
    - 我的流程 bpm/processInstance/index
    - 待办任务 bpm/task/todo/index
    - 已办任务 bpm/task/done/index
    - 用户分组 bpm/group/index

待办
1. 字典类型优化
2. 逐步去除bpm模块中的vue-types