<template>
  <div class="menu-dashboard">
    <div class="menu-dashboard-logo">
      <img src="@/assets/icons/logo-bcc-invest.svg" />
    </div>
    <div class="menu-dashboard-inner">
      <div class="category-list">
        <div
          class="category-item"
          v-for="(category, categoryIndex) in props.categories.filter(
            (item) => !item.isMainCategory
          )"
          :key="categoryIndex"
        >
          <div class="category-name">{{ category.categoryName }}</div>
          <div class="menu-item-list">
            <div
              class="menu-item"
              v-for="(menuItem, menuItemIndex) in category.menuItems"
              :key="menuItemIndex"
              :class="{
                'menu-item-active':
                  categoryIndex === currentMenuPosition[0] &&
                  menuItemIndex === currentMenuPosition[1]
              }"
            >
              <router-link :to="{ name: 'DashboardView', params: { id: menuItem.routeName } }">
                <div class="menu-item-inner">
                  {{ menuItem.menuItemName }}
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <div class="main-menu-list">
        <div
          class="menu-item main-menu-item"
          :class="{
            'menu-item-active': null === currentMenuPosition[0] && 0 === currentMenuPosition[1]
          }"
        >
          <router-link :to="{ name: 'DashboardView', params: { id: 'home' } }">
            <div class="menu-item-inner main-menu-item-inner">
              <img src="@/assets/icons/home.svg" />
              {{ 'Главная' }}
            </div>
          </router-link>
        </div>
        <div class="menu-item main-menu-item">
          <div class="menu-item-inner main-menu-item-inner" @click="logOut()">
            <img src="@/assets/icons/logout.svg" />
            {{ 'Выйти' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue'
import type { CategoryType } from '../models/category.data'
import type { MenuPositionType } from '../models/menu-position.data'
import { useRoute } from 'vue-router'

const props = defineProps({
  categories: { type: Array as PropType<CategoryType[]>, required: true }
})

const emit = defineEmits({
  changeView: (position: MenuPositionType): MenuPositionType => position
})

const route = useRoute()

const logOut = function () {
  console.log('logging out')
}

const getPositionFromRoute = function (routeName: string | undefined): MenuPositionType {
  if (routeName === undefined) {
    return [null, 0]
  }

  for (let i = 0; i < props.categories.length; i++) {
    for (let j = 0; j < props.categories[i].menuItems.length; j++) {
      if (props.categories[i].menuItems[j].routeName == routeName) {
        if (i == props.categories.length - 1) {
          return [null, j]
        }
        return [i, j]
      }
    }
  }
  return [null, 0]
}

const currentMenuPosition = computed(() => {
  const newPosition: MenuPositionType = getPositionFromRoute(
    typeof route.params.id === 'string' ? route.params.id : undefined
  )
  emit('changeView', newPosition)
  return newPosition
})
</script>

<style>
@media only screen and (min-width: 1024px) {
  .menu-dashboard {
    position: fixed;
    left: 0;
    background-color: #fff;
    width: var(--side-menu-desktop-width);
    min-height: calc(100vw * 8 / 16);
    height: 100%;
    padding: 1rem 0;
  }

  .menu-dashboard-inner {
    display: grid;
    grid-template-rows: 60% auto;
  }

  .menu-dashboard * {
    font-size: 1rem;
  }

  .menu-dashboard-logo {
    padding-left: 1.25rem;
    margin-bottom: 1.5rem;
  }
  .menu-dashboard-logo img {
    max-width: 10rem;
  }

  .category-list,
  .menu-list {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
  }

  .category-list {
    padding: 0 1.25rem;
    overflow-y: scroll;
  }

  .category-name {
    margin-bottom: 0.75rem;
  }

  .category-item {
    margin: 0.75rem 0;
  }

  .menu-item {
    padding: 0.6rem 0.75rem;
    background-color: transparent;
    margin: 0.25rem 0;
  }

  .main-menu-list {
    justify-content: flex-end;
    align-items: flex-end;
    padding: 1.5rem 0.75rem 0.5rem 0.75rem;
    height: 100%;
    background-color: #3f5bb5;
  }

  .main-menu-item {
    margin: 0.25rem 0;
  }

  .menu-item:hover .menu-item-inner {
    color: rgb(0, 33, 179);
  }

  .main-menu-list .menu-item:hover .menu-item-inner {
    color: #fff;
  }

  .menu-item-active:hover .menu-item-inner {
    color: #000;
  }

  .menu-item-active {
    background-color: #a4a7ca8a;
    border-radius: 0.25rem;
  }

  .main-menu-item {
    margin: 0;
    padding: 0;
  }

  .main-menu-item-inner {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    width: 100%;
    align-items: center;
    padding: 0.5rem 0.5rem;
    cursor: pointer;
  }

  .main-menu-item img {
    max-width: 1.5rem;
    margin-right: 0.5rem;
  }
}
</style>
