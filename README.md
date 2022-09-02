<<<<<<< HEAD
# SDK-GM

## 项目运行

拉取项目
```
git clone https://gitlab.web.996box.com/web/sdk-biz.git
```

运行项目
```
npm install
npm run serve
```

打包项目
```
npm run build
```

## 开发流程

具体流程：
- `[local]` -> `test`
- `[local]` -> `pre`
- `pre` -> `master` 或者 `[local]` -> `master`
> `[local] `为自己开发分支，每次迭代均创建新分支
  其中`test` `pre` `master` 为公共分支

1. 从`master`创建自己的分支`[local]`
```
git checkout -b [local]
```
2. 合并到`test`环境, 
```
git checkout test
git pull
git merge [local]
git push origin test
```
3. 合并到`pre-release`环境
```
git checkou pre-release
git pull
git merge [local]
git push origin pre-release
```
4. 合并到`master`
```
// 正常情况
git checkout master
git pull
git merge pre-release
git push origin master

// 特殊情况 例：pre包含多分支代码，其中之一特殊情况，暂不发布
git checkout master
git pull
git merge [local]
git push origin master
```
> 注：
  合并到公共分支前，先保证`[local]`环境代码完整，即包含`master`代码。

## 开发规范

1. 开启`eslint`，保证没有警告再合并到公共分支。
2. `@/views`下页面文件夹或单文件大驼峰命名，文件夹内文件小驼峰命名。例如：`@/views/RealTime/Summary/Statistics/index.vue` 或者 `RealTime.vue`。
3. `@/router`路由：
    > `path`：小驼峰命名。例如：`/:appid/realTime/summary/statistics`。
    > `name`：小驼峰命名。例如：`realTimeSummaryStatistics`。
    > `component`：大驼峰命名。例如： `RealTimeSummaryStatistics`
    > `meta.title`：菜单名称
    > `meta.menuTag`：菜单指向，小驼峰命名。例如：`realTimeSummaryStatistics`
    > `meta.isMenu`：是否是菜单。例如：`true`
    > `meta.crumbs`：面包屑。例如：`['实时', '概况', '实时统计']`
    > `meta.isCrumbs`：是否启用默认面包屑。例如：`true`
4. `@/router`、`@/api`、`@/views`建议模块对应。
5. `@/components`文件夹下存放全局组件。文件夹或单文件大驼峰命名，文件夹内文件小驼峰命名。例如：`Table/index.vue` 或者 `Logo.vue`。
    > 注：
    模块内组件，不要放在`@/components`。可以在自己模块文件夹下创建`components`文件夹，例如 `@/views/RealTime/components`

## 代码规范

1. 遵循`eslint`。
2. 使用`scoped`，防止样式污染。 例如：`<style lang="less" scoped></style>`
3. 设置全局浏览器样式。例如: `ul li ol`，放在`@/styles/index.less`文件下
4. 自定义全局 `class或者id` 样式，放在`@/styles/global.less`文件下
5. 修改全局`element-ui`样式，放在`@/styles/element-ui.less`文件下
6. 建议使用公共组件，容易跨模块维护。
=======
# sdk-template
>>>>>>> 0857d16169e589142936b66a1c838aa87520098e
