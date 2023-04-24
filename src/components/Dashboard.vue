<script>
import Navbar from "./Navbar.vue";
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
};
</script>
<template>
  <Navbar />
  <div class="pipeline-sec">
    <div class="pipeline">
      <div class="pipeline-content">
        <h1>Pipeline Inspection</h1>
        <p>Add of search data</p>
      </div>
      <div class="pipeline-options">
        <router-link to="/inspectionA" class="option">
          <div class="option">
            <img class="plus-icon" src="../assets/plus.png" alt="" />
            <h2>Add new inspection</h2>
          </div>
        </router-link>

        <router-link to="/addNewClient" class="option">
          <div class="option">
            <img class="search-icon" src="../assets/user.png" alt="" />
            <h2>Add New Client</h2>
          </div>
        </router-link>
      </div>
      <div class="pipeline-options" style="margin-top: 20px">
        <router-link to="/savedInspection" class="option">
          <div class="option">
            <img class="plus-icon" src="../assets/file.png" alt="" />
            <h2>Saved Client Details</h2>
          </div>
        </router-link>

        <router-link to="/searchInspection" class="option">
          <div class="option">
            <img class="search-icon" src="../assets/searching.png" alt="" />
            <h2>Search</h2>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<style scoped>
.pipeline-sec {
  display: flex;
  justify-content: center;
  align-items: center;
}

.pipeline {
  border: 1px solid orange;
  margin-top: 10px;
  padding: 10px;
  min-width: 70vw;
}

.pipeline-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.pipeline-content>h1 {
  font-size: 40px;
  margin: 0;
}

.pipeline-options {
  display: flex;
  justify-content: space-between;
}

.option {
  background-color: rgb(248, 227, 198);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40%;
  height: 200px;
  border-radius: 10px;
}

.option>h2 {
  font-size: 15px;
}

.plus-icon {
  width: 70px;
}

.search-icon {
  width: 70px;
  border-radius: 20px;
}</style>
