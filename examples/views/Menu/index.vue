<template>
  <div>
    <Menu>
      <MenuGroup title="分组一">
        <template #title>
          <div>Custom Title</div>
        </template>
        <MenuItem symbol="menu1" icon="user">菜单一</MenuItem>
        <MenuItem symbol="menu2" icon="user" disabled>菜单二</MenuItem>
        <MenuItem symbol="menu3" icon="user">菜单三</MenuItem>
      </MenuGroup>
    </Menu>
  </div>
</template>

<script setup></script>

<style lang="scss"></style>
