import Vue from "vue";
import { SGVFactory } from "../lib/sg-resource/index";
import { apiConfig, mockData, serverConfig } from "./config/index";

Vue.use(SGVFactory.createVuePlugin(), {apiConfig, serverConfig, mockData})
require("./index.module");
