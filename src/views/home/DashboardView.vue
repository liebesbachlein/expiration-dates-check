<template>
  <div class="site-content dashboard">
    <MenuDashboard
      :categories="categories"
      @changeView="(position) => (currentMenuPosition = position)"
    />
    <component
      :is="currentView.component"
      :routeName="currentView.routeName"
      :sectionName="currentView.menuItemName"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import MenuDashboard from './components/MenuDashboard.vue'
import type { CategoryType } from './models/category.data'
import type { MenuPositionType } from './models/menu-position.data'
import CertificateSSL from './views/CertificateSSL.vue'
import AppStoreSubscription from './views/AppStoreSubscription.vue'
import DomainName from './views/DomainName.vue'
import AddressBar from './views/AddressBar.vue'
import WelcomeView from './views/WelcomeView.vue'
import type { MenuItemType } from './models/menu-item.data'

const currentMenuPosition = ref<MenuPositionType>([null, 0])

const categories: CategoryType[] = [
  {
    isMainCategory: false,
    categoryName: 'Веб',
    menuItems: [
      {
        menuItemName: 'Сертификаты безопасности (SSL)',
        routeName: 'ssl-certificate',
        component: CertificateSSL
      },
      {
        menuItemName: 'Доменное имя',
        routeName: 'domain-name',
        component: DomainName
      },
      {
        menuItemName: 'Адресная строка',
        routeName: 'address-bar',
        component: AddressBar
      }
    ]
  },
  {
    isMainCategory: false,
    categoryName: 'Мобильное приложение',
    menuItems: [
      {
        menuItemName: 'Подписка на App Store',
        routeName: 'app-store-subscription',
        component: AppStoreSubscription
      }
    ]
  },
  {
    isMainCategory: false,
    categoryName: 'Веб',
    menuItems: [
      {
        menuItemName: 'Сертификаты безопасности (SSL)',
        routeName: 'ssl-certificate',
        component: CertificateSSL
      },
      {
        menuItemName: 'Доменное имя',
        routeName: 'domain-name',
        component: DomainName
      },
      {
        menuItemName: 'Адресная строка',
        routeName: 'address-bar',
        component: AddressBar
      }
    ]
  },
  {
    isMainCategory: false,
    categoryName: 'Мобильное приложение',
    menuItems: [
      {
        menuItemName: 'Подписка на App Store',
        routeName: 'app-store-subscription',
        component: AppStoreSubscription
      }
    ]
  }
]

categories.push({
  isMainCategory: true,
  categoryName: '',
  menuItems: [
    {
      menuItemName: 'Главная',
      routeName: '/home',
      component: WelcomeView
    }
  ]
})

const currentView = computed((): MenuItemType => {
  return categories[currentMenuPosition.value[0] ?? categories.length - 1].menuItems[
    currentMenuPosition.value[1]
  ]
})
</script>

<style>
.site-content {
  position: absolute;
  width: 100%;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--backdrop-color-desktop);
  height: 100%;
}

.dashboard {
}
</style>
