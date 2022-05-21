<template>
  <div>
    <v-spacer></v-spacer>
    <template>
      <v-form>
        <v-container>
          <v-col class="d-flex align-center justify-center flex-column">
            <v-col cols="12" md="4">
              <v-text-field
                v-model.number="postData.name"
                label="Enter Dessert name"
                required
              ></v-text-field>
            </v-col>  
            <v-col cols="12" md="4">
              <v-text-field
                v-model.number="postData.calories"
                label="Enter calories"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model.number="postData.fat"
                label="Enter fat"
              ></v-text-field>  
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
              type="number"
                v-model.number="postData.carbs"
                label="Enter carbs"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model.number="postData.protein"
                label="Enter protein"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model.number="postData.iron"
                label="Enter iron"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-btn @click="submitData" style="width: 100%;">Submit</v-btn>
            </v-col>
          </v-col>
        </v-container>
      </v-form>
    </template>
    <v-spacer></v-spacer>
  </div>
</template>

<script>
import Axios from '@/apis/Axios';
import router from "../router/router.js"

export default {
  name: "CreatePost",
  data() {
    return {
      postData: {
        name: "",
        calories: "",
        fat: "",
        carbs: "",
        protein: "",
        iron: "",
      },
    };
  },
  methods: {
      submitData: async function(){
          await Axios.post("/posts",this.postData);
          this.$vToastify.success("Data successfully added")
          router.push("/")
      }
  }
};
</script>

<style scoped></style>
