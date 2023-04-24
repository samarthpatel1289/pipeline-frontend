<script>
import Navbar from "./Navbar.vue";
import axios from "axios";
export default {
  components: { Navbar },

  mounted() {
    const user = localStorage.getItem("user-logged");

    if (user !== "true") {
      this.$router.push({
        name: "Login",
      });
    }

    this.getSavedClients();
  },

  data() {
    return {
      dataClient: [],
    };
  },
  methods: {
    async getSavedClients() {
      await axios
        .get("http://pipeline-dev2.us-west-2.elasticbeanstalk.com/clients")
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.dataClient = res.data.clients;
          }
        })
        .catch((err) => {
          console.log(err);
          alert(err.response?.data?.message);
        });
    },
  }
};
</script>
<template>
  <Navbar />
  <div class="container">
    <p><router-link to="/">&larr; Go Back </router-link></p>
    <h4 style="background-color: red; width: 80%; color: aliceblue">{{ this.errMsg }}</h4>
    <h3>Saved Client details</h3>
    <div class="main-container">
      <div class="single-box" v-for="item in this.dataClient" v-bind:key="item.id">
        <img src="../assets/cloud.png" alt="" />
        <div class="content-box">
          <h1>{{ item.name }}</h1>
          <h3>{{ item.address1 }}, {{ item.address2 }}</h3>
          <h3>{{ item.state }}, {{ item.city }} - {{ item.zipcode }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.container {
  border: 2px solid orange;
  margin-top: 20px;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
}

.container>p {
  align-self: flex-start;
  font-weight: bolder;
  color: rgb(4, 4, 138);
}

router-link {
  align-self: flex-start;
  font-weight: bolder;
  color: rgb(4, 4, 138);
}

.single-box {
  background: orange;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.single-box {
  min-width: 400px;
  padding: 10px;
  border-radius: 15px;
  margin-top: 10px;
}

.single-box>img {
  width: 50px;
  height: 50px;
}

.content-box>h1 {
  font-size: 25px;
}

h1,
h3 {
  margin: 2px;
}
</style>
