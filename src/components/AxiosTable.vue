<template>
  <div>
    <v-simple-table :items-per-page="5" class="elevation-1">
      <template v-slot:default>
        <thead>
          <tr>
            <th v-for="(header, i) in headers" :key="header.value">
              <span v-if="i == 0 || i == 6 || i == 7">{{ header.text }}</span>
              <span v-else class="forArrow" @click="sort(header.value, i - 1)"
                >{{ header.text
                }}<v-icon class="hide">mdi-arrow-down-thin</v-icon></span
              >
            </th>
          </tr>
        </thead>
        <tbody v-for="(post, index) in posts" :key="index">
          <tr
            v-if="
              index >= currentPage * setOfPages &&
              index <= currentPage * setOfPages + setOfPages - 1
            "
          >
            <td>{{ post.name }}</td>
            <td>{{ post.calories }}</td>
            <td>{{ post.fat }}</td>
            <td>{{ post.carbs }}</td>
            <td>{{ post.protein }}</td>
            <td>{{ post.iron }}</td>
            <td>
              <v-btn
                class="mx-2"
                fab
                dark
                small
                color="pink"
                @click="editing(post.id)"
              >
                <v-icon dark>mdi-pen</v-icon>
              </v-btn>
            </td>
            <td>
              <v-btn
                class="mx-2"
                fab
                dark
                small
                color="pink"
                @click="deleting(post.id)"
              >
                <v-icon dark>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template></v-simple-table
    >

    <div class="pagination">
      <span class="d-flex space-between align-center" style="width: 1450px">
        <span class="pageNumbers">
          <span
            ><v-btn elevation="0" color="#fff" @click="pageDecrement"
              ><v-icon>mdi-chevron-left</v-icon></v-btn
            ></span
          >
          <span v-for="num in [0, 1, 2, 3]" :key="num"
            ><span
              v-if="num <= totalPages"
              class="pages"
              @click="setExactPage(num)"
              >{{ num + 1 }}</span
            ></span
          >
          <span
            ><v-btn elevation="0" color="#fff" @click="pageIncrement"
              ><v-icon>mdi-chevron-right</v-icon></v-btn
            ></span
          >
        </span>
        <span>
          Skip to page number : <input type="text" id="skipPage" v-model.number="skipPage" style="border: 1px solid black; width: 20px; text-align: center; border-radius: 4px; background-color: rgb(250, 248, 245);">
        </span>
        <v-spacer></v-spacer>
        <span>Rows per page:</span>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              {{ setOfPages }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(oneSet, index) in allSetOfPages" :key="index">
              <v-list-item-title @click="setAllSetOfPages(oneSet)">{{
                oneSet
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <span>
          {{ currentPage * setOfPages + 1 }} -
          {{ currentPage * setOfPages + setOfPages }} of
          {{ (totalPages + 1) * setOfPages }}</span
        >
        <v-btn elevation="0" color="#fff" @click="pageDecrement"
          ><v-icon>mdi-chevron-left</v-icon></v-btn
        >
        <v-btn elevation="0" color="#fff" @click="pageIncrement"
          ><v-icon>mdi-chevron-right</v-icon></v-btn
        >
      </span>
    </div>
  </div>
</template>

<script>
import Axios from "@/apis/Axios";
import router from "../router/router.js";

export default {
  name: "AxiosTable",
  async mounted() {
    this.posts = (await Axios.get("/posts")).data;
    this.headers = (await Axios.get("/headers")).data;
    this.totalPages = Math.ceil(this.posts.length / this.setOfPages) - 1;
  },
  updated() {
    console.log("updated");
    let pages = document.getElementsByClassName("pages");
    for (let i = 0; i < pages.length; i++) {
      pages[i].classList.remove("currentPage");
    }
    pages[this.currentPage].classList.add("currentPage");
  },
  data() {
    return {
      headers: [],
      posts: [],
      setOfPages: 5,
      allSetOfPages: [5, 10, 15, "all"],
      currentPage: 0,
      totalPages: 0,
      skipPage: "",
    };
  },
    watch: {
  //     totalPages: function(){
  // if(this.totalPages < this.currentPage){
  //         console.log("in");
  //         --this.currentPage;
  //       }
  //     },
  skipPage: function(){
    if(this.skipPage-1 <= this.totalPages && this.skipPage-1 >= 0){
    this.currentPage = (this.skipPage - 1)
    // this.skipPage = ""
    }
  },
    },
  methods: {
    deleting: async function (id) {
      await Axios.delete(`/posts/${id}`);
      this.posts = (await Axios.get("/posts")).data;
      this.totalPages = Math.ceil(this.posts.length / this.setOfPages) - 1;
        //This condition can also be written inside " watch " property as well.
      if (this.totalPages < this.currentPage) {
        --this.currentPage;
      }

      this.$vToastify.success("successfully deleted");
    },
    editing: function (id) {
      router.push(`/edit-post/${id}`);
    },
    setAllSetOfPages: function (oneSet) {
      if (oneSet == "all") {
        this.setOfPages = this.posts.length;
        this.currentPage = 0;
      } else {
        this.setOfPages = oneSet;
        this.currentPage = 0;
        this.totalPages = Math.ceil(this.posts.length / this.setOfPages) - 1;
      }
    },
    pageIncrement: function () {
      if (this.currentPage < this.totalPages) {
        ++this.currentPage;
      }
    },
    pageDecrement: function () {
      if (this.currentPage > 0) {
        --this.currentPage;
      }
    },

    sort(header, rotateIndex) {
      let rotate = document.getElementsByClassName("hide"); //for rotating icon
      rotate[rotateIndex].classList.toggle("rotateIcon");
      this.posts.sort(function (a, b) {
        // sorting
        if (rotate[rotateIndex].classList.contains("rotateIcon"))
          return a[header] > b[header] ? 1 : -1;
        else return a[header] < b[header] ? 1 : -1;
      });
    },
    setExactPage(num) {
      this.currentPage = num;
    },
  },
};
</script>

<style scoped>
.pagination {
  padding: 10px;
  display: flex;
}
.hide {
  opacity: 0;
}
.forArrow:hover .hide {
  opacity: 1;
}
.rotateIcon {
  transform: rotate(180deg);
}
.pages {
  padding: 10px;
  border-radius: 50%;
}
.pages:hover {
  background-color: gray;
}
.currentPage {
  background-color: brown;
}
</style>
