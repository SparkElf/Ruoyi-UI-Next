版本更改
1. 优化路由
- 每个路由的name都设置为uuid，否则路径排序时/test/subtest路径在/test和/test/subtest路由都存在的情况下会匹配到/test
- 路由的组件不能是Layout，以简化路由逻辑
- 支持菜单作为一级目录，也可以拥有页面