<script>
import Navbar from "./Navbar.vue";
import axios from "axios";

export default {
  components: { Navbar },
  mounted() {
    const user = localStorage.getItem("user-logged");

    if (user === "true") {
      this.$router.push({
        name: "Dashboard",
      });
    }
  },
  data() {
    return {
      register_data: {
        firstname: "",
        lastname: "",
        emp_id: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async registerUser() {
      await axios
        .post("http://pipeline-dev2.us-west-2.elasticbeanstalk.com/signup", this.register_data)
        .then((res) => {
          console.log("$$$ res", res);
          this.$router.push({
            name: "Login",
          });
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
  <div class="register-section">
    <div class="register-container">
      <h1>Sign Up</h1>
      <label class="label-imp">First Name</label>
      <input v-model="this.register_data.firstName" placeholder="Enter First name" class="text-box" type="text" />
      <label class="label-imp">Last name</label>
      <input v-model="this.register_data.lastName" placeholder="Enter last name" class="text-box" type="text" />
      <label class="label-imp">Employee ID</label>
      <input v-model="this.register_data.emp_id" placeholder="Enter your employee id" class="text-box" type="text" />
      <label class="label-imp">Email ID</label>
      <input v-model="this.register_data.email" placeholder="Enter your email id" class="text-box" type="text" />
      <label class="label-imp">Password</label>
      <input v-model="this.register_data.password" placeholder="Enter password" class="text-box" type="password" />
      <!-- <label class="label-imp">Confirm Password</label>
                  <input v-model="this.register_data.cpass" placeholder="Enter password again" class="text-box" type="password" /> -->

      <button @click="registerUser()">Sign Up</button>
    </div>
  </div>
</template>
<style scoped>
h1 {
  text-align: center;
  width: 100%;
}

.register-section {
  display: flex;
  justify-content: center;
  align-items: center;
}

.register-container {
  border: 1px solid rgb(241, 157, 31);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 30px;
  margin-top: 20px;
}

.label-imp {
  font-size: large;
  padding: 4px;
  padding-left: 0;
}

.text-box {
  padding: 10px 5px;
  width: 300px;
  border-radius: 5px;
  border: 2px solid rgb(252, 168, 14);
}

.lock-icon {
  width: 20px;
  margin-right: 5px;
}

button {
  margin-top: 15px;
  width: 300px;
  color: white;
  background: rgb(2, 2, 100);
}

.item {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
