<template>
  <div class="main">
    <Menu activeItem="menu127" mode="horizontal" :accordion="false">
      <SubMenu symbol="submenu11" icon="user" title="最伟大的作品">
        <MenuItem symbol="menu11" icon="user">倒影</MenuItem>
        <MenuItem symbol="menu21" icon="user" disabled>粉色海洋</MenuItem>
        <MenuItem symbol="menu31" icon="user">错过的烟火</MenuItem>
        <MenuGroup title="中国古风">
          <SubMenu symbol="submenu1213" icon="user" title="古风专辑">
            <MenuItem symbol="menu41" icon="user">红颜如霜</MenuItem>
            <MenuItem symbol="menu51" icon="user">还在流浪</MenuItem>
            <MenuItem symbol="menu61" icon="user">我是如此相信</MenuItem>
            <MenuItem symbol="menu71" icon="user">等你下课</MenuItem>
          </SubMenu>
          <MenuGroup title="中国古风1">
            <MenuItem symbol="menu81" icon="user">兰亭序</MenuItem>
          </MenuGroup>
        </MenuGroup>
        <SubMenu symbol="submenu121" icon="user" title="叶惠美">
          <MenuItem symbol="menu121" icon="user">听妈妈的话</MenuItem>
          <MenuItem symbol="menu221" icon="user" disabled>我不配</MenuItem>
          <MenuItem symbol="menu321" icon="user">以父之名</MenuItem>
        </SubMenu>
      </SubMenu>
      <SubMenu symbol="submenu12" icon="user" title="七月的肖邦">
        <MenuItem symbol="menu12" icon="user">花海</MenuItem>
        <MenuItem symbol="menu22" icon="user" disabled>七里香</MenuItem>
        <MenuItem symbol="menu32" icon="user">一路向北</MenuItem>
      </SubMenu>
      <MenuItem symbol="menu127" icon="user" :disabled="true">不能说的秘密</MenuItem>
    </Menu>
  </div>
</template>

<script setup></script>

<style lang="scss">
.main {
  // width: 240px;
}
</style>
