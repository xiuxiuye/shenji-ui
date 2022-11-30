<template>
  <div class="main">
    <Menu
      activeItem="menu127"
      mode="inline"
      :accordion="true"
      @expand="handleClick"
    >
      <SubMenu symbol="1" icon="user" title="最伟大的作品" :disabled="false">
        <MenuItem symbol="2" icon="user">倒影</MenuItem>
        <MenuItem symbol="3" icon="user" disabled>粉色海洋</MenuItem>
        <MenuItem symbol="4" icon="user">错过的烟火</MenuItem>
        <MenuGroup title="中国古风">
          <SubMenu symbol="5" icon="user" title="古风专辑a">
            <MenuItem symbol="6" icon="user">红颜如霜</MenuItem>
            <MenuItem symbol="7" icon="user">还在流浪</MenuItem>
            <MenuItem symbol="8" icon="user">我是如此相信</MenuItem>
            <MenuItem symbol="9" icon="user">等你下课</MenuItem>
            <MenuGroup title="中国古风2">
              <SubMenu symbol="10" icon="user" title="古风专辑b">
                <MenuItem symbol="11" icon="user">红颜如霜</MenuItem>
                <MenuItem symbol="12" icon="user">还在流浪</MenuItem>
                <MenuItem symbol="13" icon="user">我是如此相信</MenuItem>
                <MenuItem symbol="14" icon="user">等你下课</MenuItem>
              </SubMenu>
              <MenuGroup title="中国古风3">
                <MenuItem symbol="15" icon="user">兰亭序</MenuItem>
              </MenuGroup>
            </MenuGroup>
          </SubMenu>
          <MenuGroup title="中国古风1">
            <MenuItem symbol="16" icon="user">兰亭序</MenuItem>
          </MenuGroup>
        </MenuGroup>
        <SubMenu symbol="17" icon="user" title="叶惠美">
          <MenuItem symbol="18" icon="user">听妈妈的话</MenuItem>
          <MenuItem symbol="19" icon="user" disabled>我不配</MenuItem>
          <MenuItem symbol="20" icon="user">以父之名</MenuItem>
        </SubMenu>
      </SubMenu>
      <SubMenu symbol="21" icon="user" title="七月的肖邦">
        <MenuItem symbol="menu12" icon="user">花海</MenuItem>
        <MenuItem symbol="menu22" icon="user" disabled>七里香</MenuItem>
        <MenuItem symbol="menu32" icon="user">一路向北</MenuItem>
      </SubMenu>
      <MenuItem symbol="22" icon="user" disabled>不能说的秘密</MenuItem>
      <!-- <MenuGroup title="中国古风12">
        <MenuItem symbol="23" icon="user">兰亭序</MenuItem>
      </MenuGroup> -->
    </Menu>
  </div>
</template>

<script setup>
const handleClick = (v) => {
  console.log(v)
}
</script>

<style lang="scss">
.main {
  width: 240px;
}
</style>
