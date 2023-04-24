<script>
import axios from "axios";
import Navbar from "./Navbar.vue";

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
      login_data: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async loginUser() {
      await axios
        .post("http://pipeline-dev2.us-west-2.elasticbeanstalk.com/login", this.login_data)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            localStorage.setItem("user-logged", "true");
            console.log("WWW", JSON.stringify(res.data));
            localStorage.setItem("user-info", JSON.stringify(res.data));
            this.$router.push({
              name: "Dashboard",
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
  <div class="login-section">
    <div class="login-container">
      <h1>Login</h1>
      <label class="label-imp">Email</label>
      <input v-model="this.login_data.email" placeholder="Enter Email" class="text-box" type="text" />
      <label class="label-imp">Password</label>
      <input v-model="this.login_data.password" placeholder="Enter password" class="text-box" type="password" />
      <div class="item">
        <input type="checkbox" />
        <label for="remember me">Remember me</label>
      </div>
      <button class="login-btn" @click="loginUser()">Login</button>
      <div class="item">
        <img src="../assets/lock.png" class="lock-icon" alt="" />
        <label for="forget_pass">Forgot your Password?</label>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
  width: 100%;
}

.login-section {
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-container {
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
  border-radius: 10px;
  border: 2px solid rgb(252, 168, 14);
}

.lock-icon {
  width: 20px;
  margin-right: 5px;
}

button {
  margin-top: 10px;
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
