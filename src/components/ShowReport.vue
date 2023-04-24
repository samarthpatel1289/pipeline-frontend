<script>
import Navbar from "./Navbar.vue";
import axios from "axios";

export default {
  props: { id: String },
  mounted() {
    const user = localStorage.getItem("user-logged");
    if (user !== "true") {
      this.$router.push({
        name: "Login",
      });
    } else {
      // const data = JSON.parse(localStorage.getItem("search_data"));

      // const id = this.$route.params.id;
      // const resultToBeDisplayed = data.result.find((item) => {
      //   if (item.inspectionid === id) {
      //     return item;
      //   }
      // });
      // this.all_data = resultToBeDisplayed;

      this.getRecordByInspectionId();

    }
  },
  components: { Navbar },
  data() {
    return {
      all_data: {}
    };
  },
  methods: {
    async getRecordByInspectionId() {
      await axios
        .post("http://pipeline-dev2.us-west-2.elasticbeanstalk.com/get_data", { inspectionid: this.$route.params.id })
        .then((res) => {

          this.all_data = (res.data.data);
          console.log("$$$ all_data", this.all_data);
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

  <div class="record-container">
    <p><router-link to="/searchInspection">&larr; Go Back </router-link></p>
    <h1>Search Result</h1>

    <div class="container-inner">
      <div class="left">
        <div class="item">
          <h4>Client</h4>
          <h4>{{ this.all_data.client?.name }}</h4>
        </div>
        <div class="item">
          <h4>Date</h4>
          <h4>{{ this.all_data.inspectionData?.date }}</h4>
        </div>
        <div class="item">
          <h4>Location</h4>
          <h4>{{ this.all_data.city }}</h4>
        </div>
        <div class="item">
          <h4>Part#/ Report#</h4>
          <h4>{{ this.all_data.inspectionData?.part_report }}</h4>
        </div>
        <div class="item">
          <h4>Part Identification</h4>
          <h4>{{ this.all_data.inspectionData?.partidentification }}</h4>
        </div>
        <div class="item">
          <h4>Procedure</h4>
          <h4>{{ this.all_data.inspectionData?.procedure }}</h4>
        </div>
        <div class="item">
          <h4>PNID#</h4>
          <h4>{{ this.all_data.inspectionData?.pnid }}</h4>
        </div>
        <div class="item">
          <h4>DWGA</h4>
          <h4>{{ this.all_data.inspectionData?.dwg }}</h4>
        </div>
        <div class="item">
          <h4>Temp</h4>
          <h4>{{ this.all_data.inspectionData?.temp }}</h4>
        </div>
        <div class="item">
          <h4>MTL</h4>
          <h4>{{ this.all_data.inspectionData?.mtl }}</h4>
        </div>
      </div>
      <div class="right">
        <div class="item">
          <h4>Calibration Block</h4>
        </div>
        <div class="item">
          <h4>Material</h4>
          <h4>{{ this.all_data.CalibrationData?.material }}</h4>
        </div>
        <div class="item">
          <h4>Surface</h4>
          <h4>{{ this.all_data.CalibrationData?.surface }}</h4>
        </div>
        <div class="item">
          <h4>Ultrasonic Equipment</h4>
        </div>
        <div class="item">
          <h4>Model #</h4>
          <h4>{{ this.all_data.UltrasonicData?.model }}</h4>
        </div>
        <div class="item">
          <h4>Serial #</h4>
          <h4>{{ this.all_data.UltrasonicData?.serial }}</h4>
        </div>
        <div class="item">
          <h4>Probe</h4>
        </div>
        <div class="item">
          <h4>Probe Model #</h4>
          <h4>{{ this.all_data.proble_model }}</h4>
        </div>
        <div class="item">
          <h4>Probe Serial #</h4>
          <h4>{{ this.all_data.probe_serial }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.left {
  border: 1px solid orange;
  width: 40%;
}

h4 {
  border: 1px solid rgb(168, 111, 4);
  width: 100%;
  margin: 0;
  padding: 10px;
}

.right {
  border: 1px solid orange;
  width: 40%;
}

.item {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

p,
router-link {
  align-self: flex-start;
}

.container-inner {
  display: flex;
  justify-content: space-around;
}
</style>
