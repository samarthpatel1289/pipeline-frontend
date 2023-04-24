<script>
import Navbar from "../Navbar.vue";
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
      hello: "hello",
      data_1: true,
      data_2: false,
      data_3: false,
      clickedOption: "clicked-option",
      elbow_north: "",
      pipe_north: "",
      tee_north: "",
      resultData: {
        elbow_north: "",
        pipe_north: "",
        tee_north: "",
      },
    };
  },
  methods: {
    changeTo1() {
      this.data_1 = true;
      this.data_2 = false;
      this.data_3 = false;
    },
    changeTo2() {
      this.data_1 = false;
      this.data_2 = true;
      this.data_3 = false;
    },
    changeTo3() {
      this.data_1 = false;
      this.data_2 = false;
      this.data_3 = true;
    },
    submitData() {
      if (this.data_1) {
        this.resultData.elbow_north = this.elbow_north;
        this.elbow_north = "";
      } else if (this.data_2) {
        this.resultData.pipe_north = this.pipe_north;
        this.pipe_north = "";
      } else if (this.data_3) {
        this.resultData.tee_north = this.tee_north;
        this.tee_north = "";
      }
    },
    moveToNext() {
      this.$router.push({
        name: "InspectionA",
      });
    },
  },
};
</script>
<template>
  <Navbar />
  <div class="inspection-a-section">
    <p><router-link to="/">&larr; Go Back </router-link></p>
    <h4 style="background-color: red; width: 80%; color: aliceblue">{{ this.errMsg }}</h4>
    <h3>New Inspection</h3>
    <div class="inspection-a-menu">
      <button @click="changeTo1()" :class="data_1 ? clickedOption : ''">
        <h4>Elbow</h4>
      </button>
      <button @click="changeTo2()" :class="data_2 ? clickedOption : ''">
        <h4>Pipe</h4>
      </button>
      <button @click="changeTo3()" :class="data_3 ? clickedOption : ''">
        <h4>Tee</h4>
      </button>
    </div>
    <div class="inspection-a-menu" v-if="data_1">
      <h3>North</h3>
      <input type="text" placeholder="Measurement" v-model="this.elbow_north" />
    </div>
    <div class="inspection-a-menu" v-if="data_2">
      <h3>North</h3>
      <input type="text" placeholder="Measurement" v-model="this.pipe_north" />
    </div>
    <div class="inspection-a-menu" v-if="data_3">
      <h3>North</h3>
      <input type="text" placeholder="Measurement" v-model="this.tee_north" />
    </div>
    <div class="middle-item">
      <button @click="submitData()">ADD</button>
    </div>

    <div class="display-measures">
      <div>
        <label for="" style="width: 50px">ELBOW</label>
        <label style="margin-left: 40px">{{ this.resultData.elbow_north }}</label>
      </div>
      <div>
        <label for="" style="width: 50px">PIPE</label>
        <label style="margin-left: 40px"> {{ this.resultData.pipe_north }}</label>
      </div>
      <div>
        <label for="" style="width: 50px">TEE</label>
        <label style="margin-left: 40px">{{ this.resultData.tee_north }}</label>
      </div>
    </div>
    <button class="btn-submit" @click="moveToNext()">Submit</button>
  </div>
</template>
<style scoped>
.display-measures {
}
.inspection-a-section {
  border: 1px solid orange;
  padding: 10px;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.inspection-a-section > p {
  align-self: flex-start;
  font-weight: bolder;
  color: rgb(4, 4, 138);
}

router-link {
  align-self: flex-start;
  font-weight: bolder;
  color: rgb(4, 4, 138);
}
.inspection-a-menu {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  /* border-bottom: 2px solid grey; */
  width: 80%;
  padding: 20px;
  /* background: red; */
  -webkit-box-shadow: 0px 0px 22px -4px rgba(242, 141, 17, 1);
  -moz-box-shadow: 0px 0px 22px -4px rgba(242, 141, 17, 1);
  box-shadow: 0px 0px 22px -4px rgba(242, 141, 17, 1);

  margin-top: 10px;
}
.inspection-a-menu > button {
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0;
  width: 100%;
}

button > span {
  background-color: rgb(177, 176, 176);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}

button > h4 {
  font-size: 15px;
  margin: 0;
  color: grey;
}

.clicked-option {
  -webkit-box-shadow: 0px 0px 22px -4px rgba(242, 141, 17, 1);
  -moz-box-shadow: 0px 0px 22px -4px rgba(242, 141, 17, 1);
  box-shadow: 0px 0px 22px -4px rgba(242, 141, 17, 1);
  border-radius: 20px;
}

.inspection-a-menu > input {
  width: 60%;
  height: 50px;
}
.inspection-a-menu > h3 {
  color: rgb(0, 102, 255);
}

.middle-item {
  margin: 10px;
}
.middle-item > button {
  background: grey;
  width: 100px;
}

.display-measures {
  background: rgb(170, 169, 169);
  width: 80%;
  height: 300px;
  padding: 5px;
}

.display-measures > div {
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
}

.display-measures > div > label {
  font-size: 20px;
  font-weight: bold;
}

.btn-submit {
  background: orange;
  color: white;
  font-size: 15px;
  margin: 10px;
}
</style>
