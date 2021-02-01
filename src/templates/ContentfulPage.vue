<template>    
    <Layout v-if="$context">                               
        <template v-for="(componentDefinition, index) in $context.fields.components">            
            <component 
                :is="resolveComponent(componentDefinition)" 
                :key="index"                
                :fields="componentDefinition.fields"
                />
        </template>          
    </Layout>
</template>
<page-query>
query AllTalks {
  allTalk {
    totalCount
    edges {
      node {
        ...TalkContent
      }
    }
  }
}

# fragments
fragment TalkContent on Talk {
  id
  sys {
    id
    contentType {
      sys {
        type
        linkType
        id
      }
    }
  }
  fields
}
</page-query>
<script>
export default {
    name: 'contentful-page',
    metaInfo() {        
        return {
            title: `${this.$context?.title} | UniformConf`,
            meta: [
                {
                  name: 'title',
                  content: `${this.$context?.title} | UniformConf`
                },
                {
                  name: 'description',
                  content: `${this.$context?.title} | UniformConf`
                },
                {                  
                    name: 'og:title',
                    content: `${this.$context?.title} | UniformConf`
                }
            ]
        }
    },
    provide() {        
        return {
            talks: this.mapTalks()
        }
    },
    watch: {
        $route() {                        
            // https://vuejs.org/v2/guide/computed.html#Watchers
            // This is a similiar hack to nuxt `watchQuery` but using the native VueJS watch properties
            // and detecting `$route` changes that gridsome has out of the box 
            // we can call the `reevaluateSignals` method for the Uniform Optimize tracker
            // when a querystring value changes via client-side route change,
            // e.g. clicking on a `g-link` with a querystring value in the URL
            // Otherwise, Girdsome typically doesn't do anything when querystrings are appended.                                
            this.$nextTick(() => {
                this.reevaluateSignals();
                return true;
            });
        }
    },
    async beforeCreate() {
      // The tracker is being initialized here as the Gridsome build fails
      // due to Gridsome not playing well with the async componentResolver 
      // This is a work around for the time being but the tracker now initializes
      // correctly and personalization intents are triggered            
      await this.$uniformOptimizeContext.tracker.initialize();
      await this.reevaluateSignals();      
    },
    mounted() {        
        // This is a convenience function to "automatically" evaluate any registered signals
        // after the page has rendered.
        // There's not a great way to do this in Vue because the child components aren't
        // guaranteed to have been rendered when the `mounted` event is called.
        // But `mounted` is the latest-firing event we can subscribe to in the Vue lifecycle
        // and using `$nextTick` is the "recommended" way to attempt to execute code
        // after child components are mounted. Dubious that this technique is reliable.
        
        this.$nextTick(() => {            
            this.reevaluateSignals();            
        });
    },
    methods: {
        mapTalks() {
            return this.$page.allTalk.edges.map((item) => {                            
                return {
                  id: { ...item.node.id },
                  sys: { ...item.node.sys },
                  fields: JSON.parse(item.node.fields)
                }
            });
        },      
        reevaluateSignals() {          
            if (!this.$uniformOptimizeContext.trackerInitializing) {
                this.$uniformOptimizeContext.tracker.reevaluateSignals();
            }
        },
        resolveComponent(componentDefinition) {
            // this.$uniformOptimizeContext is not initialised 
            // at this point at build time not sure why
            const component = this.$uniformOptimizeContext.componentResolver(
                componentDefinition.sys.contentType.sys.id
            );
            return component;
        }
    }  
};
</script>
