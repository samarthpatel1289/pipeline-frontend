import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../components/Dashboard.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import InspectionA from "../components/Inspection/InspectionA.vue";
import InspectionB from "../components/Inspection/InspectionB.vue";
import InspectionStart from "../components/Inspection/InspectionStart.vue";
import SearchReport from "../components/SearchReport.vue";
import RecordsList from "../components/RecordsList.vue";
import ShowReport from "../components/ShowReport.vue";
import SavedClients from "../components/SavedClients.vue";
import CreateClient from "../components/CreateClient.vue";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Regsiter",
    component: Register,
  },
  {
    path: "/inspectionA",
    name: "InspectionA",
    component: InspectionA,
  },
  {
    path: "/inspectionB",
    name: "InspectionB",
    component: InspectionB,
    props: true,
  },
  {
    path: "/searchInspection",
    name: "SearchInspection",
    component: SearchReport,
    props: true,
  },
  {
    path: "/recordsList",
    name: "RecordsList",
    component: RecordsList,
    props: true,
  },
  {
    path: "/showReport/:id",
    name: "ShowReport",
    component: ShowReport,
    props: true,
  },
  {
    path: "/initialInspection",
    name: "InitialInspection",
    component: InspectionStart,
  },
  {
    path: "/savedInspection",
    name: "SavedInspection",
    component: SavedClients,
  },
  {
    path: "/addNewClient",
    name: "CreateClient",
    component: CreateClient,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
