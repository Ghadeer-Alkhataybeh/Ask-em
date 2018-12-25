import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableHighlight
} from "react-native";

export default class SurveyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      servey: this.props.selectedSurvey
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      servey: nextProps.selectedSurvey
    });
  }

  render() {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.visibility}
          onRequestClose={() => {}}
        >
          <View style={styles.container}>
            <View>
              <Text style={styles.text}>{this.state.servey}</Text>
              <TouchableHighlight
                onPress={() => {
                  this.props.showHandler(false);
                }}
              >
                <Text style={styles.text}>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white"
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    textAlign: "left"
  },
  text: {
    fontSize: 25
  }
});