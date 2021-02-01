module.exports = {  
  purge: {    
    // purge is handled at build time by gridsome due to compatibility issues with tailwind 2.0+    
    enabled: false,    
  },  
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
    extend: {
      minHeight: {
        500: '500px',
      },
      maxHeight: {
        500: '500px',
      },
    },
  },
  variants: {},
  plugins: [],
};