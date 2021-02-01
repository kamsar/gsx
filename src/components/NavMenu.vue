<template>
  <ul class="list-reset lg:flex justify-end flex-1 items-center space-x-2 lg:mr-4">    
    <li>
      <g-link to="/" class="inline-block py-2 px-4 text-black font-bold no-underline"> Home </g-link>
    </li>
    <li>
      <g-link
        to="/developers"
        class="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
      >
        For Developers        
      </g-link>
    </li>
    <li>
      <g-link
        to="/marketers"
        class="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
      >
        For Marketers
      </g-link>
    </li>
    <li>
      <g-link
        to="/registration"
        class="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
      >
        Registration
      </g-link>
    </li>
    <li>
      <g-link
        to="/?utm_campaign=unfrmconf"
        class="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
      >
        Campaign
      </g-link>
    </li>
  </ul>
</template>
