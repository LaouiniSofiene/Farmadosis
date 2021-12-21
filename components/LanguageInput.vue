<template>
  <div class="row">
      <v-spacer></v-spacer>
    <div
      class="lang-dropdown col-1"
      v-for="locale in availableLocales"
      :key="locale.code"
    >
      <nuxt-link :class="locale.code == $i18n.locale ? 'lang-active': 'lang'" :to="switchLocalePath(locale.code)"
        >{{ locale.name }}
      </nuxt-link>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    availableLocales() {
      return this.$i18n.locales;
    },
  },
};
</script>
<style lang="scss">
.lang-dropdown {
  .lang {
    text-decoration: none;
    color: black;
  }
  .lang-active {
      text-decoration: none;
      color: red;
  }
}
</style>