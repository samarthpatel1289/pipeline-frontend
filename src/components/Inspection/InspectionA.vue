<script>
import axios from "axios";
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
      data_1: true,
      data_2: false,
      data_3: false,
      clickedOption: "clicked-option",
      errMsg: "",
      all_data: {
        inspectionData: {
          client: "",
          cima_exam: " ",
          date: "",
          partidentification: "",
          procedure: "",
          pnid: "",
          dwg: "",
          temp: "",
          purchaseorder: " ",
          part_report: "",
          specification: " ",
          acceptance_criteria: " ",
          velocity: " ",
          delay: " ",
          frequency: " ",
          description: " "
        },
        locationData: {
          address1: "",
          address2: "",
          city: "",
          state: "",
          zipcode: ""
        },
        calibrationData: {
          material: "",
          surface: ""
        },
        ultrasonicData: {
          model: "",
          serial: ""
        },
        probeData: {
          model: "",
          serial: ""
        },
        technicianData: {
          firstname: "John",
          lastname: "Doe"
        },
        typeData: {
          type: "112",
          serial: "123"
        },
        data: [
          {
            tml: "pipe",
            measurement: {
              north: 0.10,
              south: 0.20,
              east: 0.30,
              west: 0.40,
              northeast: null,
              southeast: null,
              southwest: null,
              northwest: null,
              centre: null,
              top: null,
              bottom: null,
              inside: null,
              outside: null,
              nominal: null,
              minthickness: null
            }
          },
        ]
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
    async moveToB() {
      let flag = true;
      console.log("$$ ALL DATA", JSON.parse(JSON.stringify(this.all_data)));

      for (let [key, value] of Object.entries(this.all_data.probeData)) {
        if (value === "") {
          flag = false;
          this.errMsg = key + " is not entered. Please enter to proceed";
          break;
        }
      }
      for (let [key, value] of Object.entries(this.all_data.ultrasonicData)) {
        if (value === "") {
          flag = false;
          this.errMsg = key + " is not entered. Please enter to proceed";
          break;
        }
      }
      for (let [key, value] of Object.entries(this.all_data.calibrationData)) {
        if (value === "") {
          flag = false;
          this.errMsg = key + " is not entered. Please enter to proceed";
          break;
        }
      }
      for (let [key, value] of Object.entries(this.all_data.inspectionData)) {
        if (value === "") {
          flag = false;
          this.errMsg = key + " is not entered. Please enter to proceed";
          break;
        }
      }

      if (flag) {
        // await axios
        //   .post("http://localhost:8080/api/user/inspection", this.all_data)
        //   .then((res) => {
        //     this.$router.push({
        //       name: "InspectionB",
        //     });
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
        localStorage.setItem("inspection-data", JSON.stringify(this.all_data))
        this.$router.push({
          name: "InspectionB",
        });
      }
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
        <span v-if="data_1 === true">1</span>
        <h4>Client Data</h4>
      </button>
      <button @click="changeTo2()" :class="data_2 ? clickedOption : ''">
        <span v-if="data_2 === true">2</span>
        <h4>Part Data</h4>
      </button>
      <button @click="changeTo3()" :class="data_3 ? clickedOption : ''">
        <span v-if="data_3 === true">3</span>
        <h4>Calibration Block</h4>
      </button>
    </div>
    <div class="inspection-a-content">
      <div class="data-content" v-if="data_1 === true">
        <h3>Client Data</h3>
        <label>Client</label>
        <input v-model="this.all_data.inspectionData.client" type="text" class="text-box" />
        <label>Location</label>
        <input v-model="this.all_data.locationData.address1" type="text" class="text-box" />
        <label>Date</label>
        <input v-model="this.all_data.inspectionData.date" type="text" class="text-box" />
        <label>Part #/ Report #</label>
        <input v-model="this.all_data.inspectionData.part_report" type="text" class="text-box" />
      </div>
      <div class="data-content" v-if="data_2 === true">
        <h3>Part Data</h3>
        <label>Part Identifications</label>
        <input v-model="this.all_data.inspectionData.partidentification" type="text" class="text-box" />
        <label>Procedure</label>
        <input v-model="this.all_data.inspectionData.procedure" type="text" class="text-box" />
        <label>PNID #</label>
        <input v-model="this.all_data.inspectionData.pnid" type="text" class="text-box" />
        <label>DWG #</label>
        <input v-model="this.all_data.inspectionData.dwg" type="text" class="text-box" />
        <label>Temp</label>
        <input v-model="this.all_data.inspectionData.temp" type="text" class="text-box" />
        <label>MTL</label>
        <input v-model="this.all_data.inspectionData.mtl" type="text" class="text-box" />
      </div>
      <div class="data-content2" v-if="data_3 === true">
        <h3>Calibreation Block</h3>
        <div class="row">
          <div class="single-col">
            <label>Material</label>
            <input v-model="this.all_data.calibrationData.material" type="text" class="text-box" />
            <label>Surface</label>
            <input v-model="this.all_data.calibrationData.surface" type="text" class="text-box" />
          </div>
          <div class="single-col">
            <h4>Ultrasonic Equipment</h4>
            <label>Model #</label>
            <input v-model="this.all_data.ultrasonicData.model" type="text" class="text-box" />
            <label>Serial #</label>
            <input v-model="this.all_data.ultrasonicData.serial" type="text" class="text-box" />
          </div>
          <div class="single-col">
            <h4>Probe</h4>
            <label>Probe Model #</label>
            <input v-model="this.all_data.probeData.model" type="text" class="text-box" />
            <label>Probe Serial #</label>
            <input v-model="this.all_data.probeData.serial" type="text" class="text-box" />
          </div>
        </div>
      </div>
    </div>
    <!-- <p style="align-self: flex-end"><router-link to="/inspectionB">Next &rarr;</router-link></p> -->
    <p style="align-self: flex-end; cursor: pointer" @click="moveToB()">Next &rarr;</p>
  </div>
</template>
<style scoped>
.inspection-a-content {
  display: flex;
  width: 100%;
  justify-content: space-evenly;
}

.row {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.single-col {
  display: flex;
  flex-direction: column;
  /* align-items: flex-start; */
}

.clicked-option {
  border: none;
  border-radius: 0;
  border-bottom: 2px solid blue;
}

.clicked-option>h4 {
  color: blue;
  font-size: 20px;
}

.text-box {
  padding: 10px 5px;
  /* width: 300px; */
  width: 170px;
  border-radius: 10px;
  border: 2px solid rgb(252, 168, 14);
}

.data-content2 {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 80%;
}

.data-content {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 80%;
}

.data-content>h3 {
  text-align: left;
}

.data-content>label {
  margin-top: 10px;
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

.inspection-a-section>p {
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
  border-bottom: 2px solid grey;
  width: 80%;
}

.inspection-a-menu>button {
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0;
  width: 100%;
}

button>span {
  background-color: rgb(177, 176, 176);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}

button>h4 {
  font-size: 15px;
  margin: 0;
  color: grey;
}
</style>
