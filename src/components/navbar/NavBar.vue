<template>
  <div>
    <template>
      <div>
        <v-app-bar color="deep-purple accent-4" dense dark>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>

          <v-toolbar-title>Dessert Data</v-toolbar-title>

<router-link to="/"><v-btn elevation="0" color="transparent" class="ml-5 mr-5">Posts</v-btn></router-link>

<router-link to="/create-post"><v-btn elevation="0" color="transparent" class="ml-5 mr-5">Create Post</v-btn></router-link>
          

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>mdi-heart</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>

          <v-menu left bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item v-for="n in 5" :key="n" @click="() => {}">
                <v-list-item-title>Option {{ n }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-app-bar>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style scoped></style>
