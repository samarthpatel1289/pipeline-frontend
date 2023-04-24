<script>
import Navbar from "../Navbar.vue";
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

    let dataFromInspectionA = JSON.parse(localStorage.getItem("inspection-data"));
    console.log("data is", dataFromInspectionA);

    this.postBody = { ...dataFromInspectionA };
  },
  data() {
    return {
      measurements: [],
      showModal: false,
      name: "",
      value: "",
      postBody: {},
    };
  },
  methods: {
    addData() {
      console.log(JSON.stringify(this.measurements));
      this.measurements.push([]);
      let keyName = this.name;
      this.measurements[this.measurements.length - 1].push({
        keyName: this.value,
      });
      this.value = "";
      this.name = "";
    },
    addMeasurement() {
      this.showModal = true;
    },
    async addSubmitData() {
      // this.$router.push({
      //   name: "Dashboard",
      // });

      this.postBody = {
        ...this.postBody, data: [{
          tml: "pipe", measurement: {
            "north": 0.10,
            "south": 0.20,
            "east": 0.30,
            "west": 0.40
          }
        }]
      }

      await axios
        .post("http://pipeline-dev2.us-west-2.elasticbeanstalk.com/inspection", this.postBody)
        .then((res) => {
          if (res.status === 200) {
            alert("Data submitted successfully");
          }
          else alert("Something went wrong");
        })
        .catch((err) => {
          console.log(err);
        });

    },
  },
  unmounted() {
    localStorage.removeItem("inspection-data");
  }
};
</script>

<template>
  <Navbar />
  <div class="inspection-b-section">
    <h3>New Inspection</h3>
    <div class="content-wrapper" v-if="measurements.length === 0">
      <div class="inspection-b-titles">
        <h2>TML</h2>
        <h2>1(Elbow)</h2>
      </div>
      <div class="img-no-measurement">
        <img src="../../assets/img-2.png" alt="" />
        <h3>No Measurements yet</h3>
        <h6>Add measurement from below</h6>
      </div>
    </div>
    <div class="content-wrapper" v-if="measurements.length > 0">
      <div class="content-wrapper" v-for="item in this.measurements" v-bind:key="item.id">
        <div class="inspection-b-titles">
          <h2>TML</h2>
          <h2>1(Elbow)</h2>
        </div>
        <div class="measurement-actual" v-for="measure in item" v-bind:key="measure.id">
          <h4>{{ measure.name }}</h4>
          <h4>{{ measure.value }}</h4>
        </div>
      </div>
    </div>
    <button class="btn-ins-b" @click="addSubmitData()">Submit</button>

    <button class="btn-ins-b" @click="addMeasurement()">+ Add Measurement</button>

    <div class="modal-container" v-if="this.showModal === true">
      <div class="modal">
        <h2>New Measurement</h2>
        <div class="model-content">
          <label for="">TML</label>
          <input type="text" />
          <label for="">Select measurement</label>
          <div class="modal-measurements">
            <select name="" id="" v-model="name">
              <option value="north" selected>North</option>
              <option value="east">East</option>
              <option value="west">West</option>
              <option value="south">South</option>
              <option value="northeast">North-East</option>
              <option value="northwest">North-West</option>
              <option value="southeast">South-East</option>
              <option value="southwest">South-West</option>
              <option value="bottom">Bottom</option>
              <option value="top">Top</option>
              <option value="inside">Inside</option>
              <option value="outside">outside</option>
            </select>
            <input v-model="this.value" type="text" />
          </div>
        </div>
        <div class="modal-btns">
          <button class="btn-add" @click="addData()">+ Add</button>
          <button class="btn-cancel" @click="this.showModal = false">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.measurement-actual {
  display: flex;
  width: 80%;
  background-color: rgb(209, 208, 208);
  margin: 10px;
  border-radius: 10px;
  justify-content: space-around;
}

.modal-btns {
  /* margin-top: 20px; */
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.btn-add {
  background-color: rgb(107, 107, 255);
}

.btn-cancel {
  background-color: rgb(172, 171, 171);
}

.modal-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(187, 187, 187, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

input {
  border: 1px solid orange;
  padding: 10px;
  border-radius: 5px;
}

select {
  padding: 10px;
  border: 1px solid orange;
}

.modal {
  position: absolute;
  height: 400px;
  width: 400px;
  background-color: white;
  z-index: 1000;
  opacity: 1;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.model-content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.inspection-b-section>p {
  align-self: flex-start;
  font-weight: bolder;
  color: rgb(4, 4, 138);
}

.inspection-b-section {
  border: 1px solid orange;
  padding: 10px;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.inspection-b-section {
  position: relative;
  min-height: 500px;
}

.inspection-b-titles {
  display: flex;
  width: 80%;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid grey;
  color: blue;
}

.content-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.img-no-measurement h3 {
  margin-bottom: 0;
}

.img-no-measurement h6 {
  margin-top: 0;
}

.btn-ins-b {
  margin-top: 10px;
  background-color: rgb(107, 107, 255);
}</style>
