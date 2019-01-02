import React, { Component } from "react";
import {
  StyleSheet,
  SectionList,
  Text,
  View,
  Modal,
  TouchableHighlight,
  AsyncStorage,
  ScrollView,
  Image,
  TouchableOpacity
} from "react-native";
import {
  Container,
  Header,
  Text as Textbase,
  Left,
  Icon as Iconbase,
  Button
} from "native-base";
import { Icon } from "react-native-elements";
import SurveyListThumbnails from "./SurveyListThumbnails";
import { Col, Row, Grid } from "react-native-easy-grid";

const ip = require("../ip.json");
// import IP from 'ip';
// ip = IP.mask()

export default class Account extends Component {
  static navigationOptions = {
    drawerIcon: ({ tintColor }) => (
      <Icon name="account-box" style={{ fontSize: 30 }} />
    )
  };
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      modalVisible: false,
      selectedSurvey: null,
      surveyName: "",
      surveyDescription: "",
      surveyCategory: "",
      fetchedSurveys: [],
      user_id: null,
      images: [
        "https://cdn-images-1.medium.com/max/1200/1*jh6bmapyE8nPWju7W_7qEw.png",
        "https://softwareengineeringdaily.com/wp-content/uploads/2018/12/machinelearning.jpg",
        "https://d2odgkulk9w7if.cloudfront.net/images/default-source/blogs/nativescript-vuef711652a7b776b26a649ff04000922f2.png?sfvrsn=75660efe_0"
      ]
    };
  }

  onPressMySurveys = async () => {
    try {
      const value = await AsyncStorage.getItem("userID");
      if (value !== null) {
        const token = JSON.parse(value);
        this.setState({
          user_id: ` ${token.user_id} `
        });
        fetch(`${ip}:3000/mysurveys`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: this.state.user_id })
        })
          .then(response => response.json())
          .then(res => {
            console.warn(res);
            this.setState({ fetchedSurveys: res });
          })
          .done();
      }
    } catch (error) {
      console.warn("error from the token mysurveys", error);
    }
  };
  onPressSurveysHasBeenAns = async () => {
    try {
      const value = await AsyncStorage.getItem("userID");
      if (value !== null) {
        const token = JSON.parse(value);
        this.setState({
          user_id: ` ${token.user_id} `
        });
        fetch(`${ip}:3000/surveysAnsByUser`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: this.state.user_id })
        })
          .then(response => response.json())
          .then(res => {
            this.setState({ fetchedSurveys: res });
          })
          .done(() => {
            console.warn(this.state.fetchedSurveys);
          });
      }
    } catch (error) {
      console.warn("error from the token surveysAnsByUser", error);
    }
  };