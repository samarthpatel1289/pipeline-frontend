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
  },
  data() {
    return {
      userForm: {
        name: "",
        address1: "",
        address2: "",
        state: "",
        city: "",
        zipcode: ""
      },
      errMsg: "",
    };
  },

  methods: {
    async addClient() {
      await axios
        .post("http://pipeline-dev2.us-west-2.elasticbeanstalk.com/add_clients", this.userForm)
        .then((res) => {
          console.log(res);
          if (res.status === 200 || res.status === 201) {
            alert(res.data?.message || `Client created successfully with id: ${res.data?.clientid}`);
            this.$router.push({
              name: "SavedInspection",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          alert(err.response?.data?.message);
        });
    },
  },
};
</script>
<template>
  <Navbar />
  <div class="container">
    <p><router-link to="/">&larr; Go Back </router-link></p>
    <h4 style="background-color: red; width: 80%; color: aliceblue">{{ this.errMsg }}</h4>
    <h3>New Client</h3>
    <div class="main-content">
      <h2>Client</h2>
      <input type="text" placeholder="Client name" v-model="this.userForm.name" />
      <!-- <h2>Company</h2>
                        <input type="text" placeholder="Company name" v-model="this.userForm.company_name" /> -->
      <h2>Location</h2>
      <div class="location-form">
        <input type="text" placeholder="address1" v-model="this.userForm.address1" />
        <input type="text" placeholder="address2" v-model="this.userForm.address2" />
        <input type="text" placeholder="city" v-model="this.userForm.city" />
        <input type="text" placeholder="state" v-model="this.userForm.state" />
        <input type="text" placeholder="zipcode" v-model="this.userForm.zipcode" />
      </div>
    </div>
    <button @click="addClient()" class="btn-submit">Add Client</button>
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

.location-form {
  border: 1px solid orange;
  display: flex;
  flex-direction: column;
}

.location-form>input {
  border: none;
  padding: 10px;
}

.main-content>input {
  border: 1px solid orange;
  padding: 10px;
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

.btn-submit {
  background: orange;
  color: white;
  font-size: 15px;
  margin: 15px;
}
</style>
