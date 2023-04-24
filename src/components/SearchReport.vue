<script>
import axios from "axios";
import Navbar from "./Navbar.vue";

export default {
  mounted() {
    const user = localStorage.getItem("user-logged");
    if (user !== "true") {
      this.$router.push({
        name: "Login",
      });
    }
  },
  components: { Navbar },
  data() {
    return {
      search_data: {
        clientName: "",
        location: "",
        date: "",
      },
      errMsg: "",
    };
  },
  methods: {
    async submit() {
      await axios
        .post("http://pipeline-dev2.us-west-2.elasticbeanstalk.com/search_doc", this.search_data)
        .then((res) => {
          console.log(res);
          if (res.data.result?.length == 0) {
            this.errMsg = "No Records found";
          } else {
            localStorage.setItem("search_data", JSON.stringify(res.data));
            this.$router.push({
              name: "RecordsList",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<template>
  <Navbar />
  <div class="container-search">
    <div class="main-container">
      <p><router-link to="/">&larr; Go Back </router-link></p>
      <h2 style="background-color: red; width: 80%; color: white">{{ this.errMsg }}</h2>
      <h2>Search</h2>
      <div class="form">
        <label>Client</label>
        <input v-model="this.search_data.clientName" type="text" />
        <label>Location</label>
        <input v-model="this.search_data.location" type="text" />
        <label>Date</label>
        <input v-model="this.search_data.date" type="text" />
      </div>
      <button class="btn-search" @click="submit()">Submit</button>
    </div>
    <div class="img-container">
      <img src="../assets/img-3.png" alt="" />
    </div>
  </div>
</template>

<style scoped>
p,
router-link {
  align-self: flex-start;
}

.container-search {
  display: flex;
  justify-content: space-between;
}

.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.form input {
  padding: 10px;
  border: 1px solid orange;
  min-width: 300px;
}

.form label {
  margin-top: 10px;
  align-self: flex-start;
}

.btn-search {
  margin-top: 10px;
  background-color: orange;
  color: white;
  font-weight: bold;
}
</style>
