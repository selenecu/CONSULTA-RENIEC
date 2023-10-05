<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>

        <q-toolbar-title class="row justify-center">
          CONSULTA POR DNI
        </q-toolbar-title>

      </q-toolbar>
    </q-header>
    <q-page-conteiner class="row justify-center" >
      <index-page></index-page>
    </q-page-conteiner>

  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import IndexPage from '../pages/IndexPage.vue'



export default defineComponent({
  components: { IndexPage },
  name: 'MainLayout',


  }
)
</script>
