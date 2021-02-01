<template>
  <div>
    <Personalize 
      :variations="variations"      
      tracking-event-name="heroPersonalized">
      <template v-slot:loading>
        <PersonalizedHeroLoading />
      </template>
    </Personalize>
  </div>
</template>
<script>
import { Personalize } from '@uniformdev/optimize-tracker-vue';
import { contentfulOptimizeListReader } from '@uniformdev/optimize-tracker-contentful';
import Hero from '@/components/Hero.vue';

export default {
  name: 'personalized-hero',
  components: {
    Personalize,
    PersonalizedHeroLoading: () => import('@/components/PersonalizedHeroLoading.vue')
  },
  props: {
    fields: {
      type: Object,
      default() {
        return {
          unfrmOptP13nList: {},
        };
      },
    },
    sys: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    variations() {   
      return contentfulOptimizeListReader(this.fields.unfrmOptP13nList);
    },
    mappedComponent() {
      return Hero;
    }
  },
};
</script>
