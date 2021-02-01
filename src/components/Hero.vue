
<template>
  <div>
    <div class="pt-24">
      <div class="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <div
          class="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left min-h-500"
        >
          <p class="uppercase tracking-loose w-full">Uniform demo</p>
          <h1 class="my-4 text-5xl font-bold leading-tight">{{ fields.title }}</h1>
          <p class="leading-normal text-2xl mb-8">{{ fields.description }}</p>

          <g-link
            :to="fields.buttonLinkSlug || ''"
            class="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg"
          >
            {{ fields.buttonText }}
          </g-link>
        </div>
        <div class="w-full md:w-3/5 py-6 text-center">
          <img
            v-if="imageUrl.src"
            class="w-full md:w-4/5 z-50 min-h-500 max-h-500" 
            :width="imageUrl.width"           
            height="500"
            :src="imageUrl.src"
            :alt="fields.buttonText"
            loading="lazy"
          />
        </div>
      </div>
    </div>    
    <Splitter />
  </div>
</template>

<script>
export default {
  name: 'hero-component',
  components: {
    Splitter: () => import('@/components/Splitter.vue')
  },
  props: {
    fields: {
      type: Object,
      default() {
        return {
          title: '',
          description: '',
          buttonLinkSlug: '',
          buttonText: '',
          image: {},
          unfrmOptIntentTag: undefined,
        };
      },
    },
  },
  computed: {
    imageUrl() {            
      return {
        src: this.fields.image?.fields?.file?.url,
        alt: this.fields.image?.fields?.file?.fileName,
        height: this.fields.image?.fields?.file?.details?.image?.height,
        width: this.fields.image?.fields?.file?.details?.image?.width
      }
    },
  },
  mounted() {       
    this.$uniformOptimize.trackBehavior(this.fields.unfrmOptIntentTag);
  },
};
</script>
