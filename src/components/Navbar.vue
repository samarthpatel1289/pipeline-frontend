<script>
export default {
  methods: {
    logoutUser() {
      localStorage.removeItem("user-logged");
      localStorage.removeItem("user-info");

      this.$router.push({
        name: "Login",
      });
    }
  }
};
</script>
<template>
  <header>
    <img src="../assets/logo.png" alt="" class="logo" />
    <nav>
      <ul>
        <li><router-link to="/login">Login</router-link></li>
        <li><router-link to="/signup">Signup</router-link></li>
        <button @click="logoutUser()">Logout</button>

      </ul>
    </nav>
  </header>
</template>
<style scoped>
header {
  display: flex;
  justify-items: flex-start;
  border: 1px solid black;
}
</style>
