<template>
  <div>
    <v-spacer></v-spacer>
    <template>
      <v-form>
        <v-container>
          <v-col class="d-flex align-center justify-center flex-column">
            <v-col cols="12" md="4">
              <v-text-field
                v-model="postData.name"
                label="Enter Dessert name"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="postData.calories"
                label="Enter calories"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="postData.fat"
                label="Enter fat"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="postData.carbs"
                label="Enter carbs"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="postData.protein"
                label="Enter protein"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="postData.iron"
                label="Enter iron"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-btn @click="submitData(id)" style="width: 100%">Submit</v-btn>
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
  name: "EditPost",
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
      id: 1,
    };
  },
  async mounted(){
    this.id = `${this.$route.params.id}`
     this.postData = (await Axios.get(`/posts/${this.id}`)).data;
  },
  methods: {
    submitData: async function (id) {
      await Axios.put(`/posts/${id}`, this.postData);
      this.$vToastify.success("Data successully Editted.")
      router.push("/");
    },
  },
};
</script>

<style scoped></style>
