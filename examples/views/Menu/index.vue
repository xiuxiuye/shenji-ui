<template>
  <div class="main">
    <Menu>
      <SubMenu symbol="submenu1" icon="user" title="七月的肖邦">
        <MenuItem symbol="menu1" icon="user">花海</MenuItem>
        <MenuItem symbol="menu2" icon="user" disabled>七里香</MenuItem>
        <MenuItem symbol="menu3" icon="user">一路向北</MenuItem>
      </SubMenu>
    </Menu>
  </div>
</template>

<script setup></script>

<style lang="scss">
.main {
  width: 200px;
}
</style>
