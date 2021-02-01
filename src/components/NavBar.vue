<template>
  <nav id="header" :class="`fixed w-full z-30 top-0 text-white ${isScrolled ? ' bg-white shadow' : ''}`">
    <div class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
      <div class="pl-4 flex items-center">
        <g-link
          to="/"
          aria-label="home"
          :class="`no-underline hover:no-underline font-bold text-2xl lg:text-4xl ${
            isScrolled ? ' text-gray-800' : ' text-white'
          }`"
        >
          <Logo />
        </g-link>
      </div>
      <div class="block lg:hidden pr-4">
        <button
          id="nav-toggle"
          class="flex items-center p-1 text-orange-800 hover:text-gray-900"
          @click="toggleSubmenuVisible"
        >
          <HamburgerIcon />
        </button>
      </div>
      <div
        id="nav-content"
        :class="`w-full flex-grow lg:flex lg:items-center lg:w-auto mt-2 lg:mt-0 lg:bg-transparent text-black p-4 lg:p-0 z-20 ${
          submenuVisible ? 'bg-gray-100' : 'hidden bg-white'
        } ${isScrolled ? 'bg-white' : 'bg-gray-100'}`"
      >
        <NavMenu />

        <ActionLink :is-scrolled="isScrolled" label="Forget me" :on-click="handleActionLinkClick">
          <template v-slot:icon><LockIcon /></template>
        </ActionLink>
      </div>
    </div>
    <hr class="border-b border-gray-100 opacity-25 my-0 py-0" />
  </nav>
</template>
<script>
import { throttle } from '@/utils/throttle';

const Nav = {
  name: 'Nav',
  components: {
    NavMenu: () => import('@/components/NavMenu'),
    Logo: () => import('@/components/Logo'),
    ActionLink: () => import('@/components/ActionLink'),
    LockIcon: () => import('@/components/LockIcon'),
    HamburgerIcon: () => import('@/components/HamburgerIcon'),
  },
  data() {
    return {
      submenuVisible: false,
      isScrolled: false,
    };
  },
  watch: {
    $route() {
      this.submenuVisible = false;
    }
  },
  methods: {
    toggleSubmenuVisible() {
      this.submenuVisible = !this.submenuVisible;
    },
    handleActionLinkClick() {
      this.$uniformOptimizeContext.tracker.forgetMe().then(() => {
        document.cookie =
          'unfrmconf_registered=; Path=/; samesite=lax; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      });
    },
    updateScroll() {
      if (typeof window !== 'undefined') {
        this.isScrolled = window.scrollY > 0;
      }
    },
  },
  mounted() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', throttle(this.updateScroll, 150, false));
    }
  },
  destroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.updateScroll);
    }
  },
};

export default Nav;
</script>
