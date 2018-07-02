import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

const GREEN = '#42f48c';
const RED = '#ea3535';
const BLACK = '#2b2323';
const NEUTRAL = '#fffaf2';

let NUM_GREEN = 8;
let NUM_RED = 8;
let NUM_BLACK = 1;
let NUM_NEUTRAL = 8;
export default class App extends React.Component {
  constructor(props) {
    super(props);
    var boxes = [];
    for (var x = 0; x < NUM_GREEN; x++) {
      boxes.push(GREEN);
    }
    for (var x = 0; x < NUM_RED; x++) {
      boxes.push(RED);
    }
    for (var x = 0; x < NUM_BLACK; x++) {
      boxes.push(BLACK);
    }
    for (var x = 0; x < NUM_NEUTRAL; x++) {
      boxes.push(NEUTRAL);
    }
    this._shuffleArray(boxes);

    this.state = {
      boxes: boxes
    };
  }

  _shuffleArray(array) {
    length = array.length;
    for (var x = 0; x < array.length; x++) {
      this._swap(array, x, Math.floor(Math.random() * length));
    }
  }
  _swap(b, h, k) {
    temp = b[h];
    b[h] = b[k];
    b[k] = temp;
  }

  _renderRow(startElement, array) {
    row = [];
    for (var x = startElement; x < startElement + 5; x++) {
      element = this._renderElement(array[x]);
      row.push(element);
    }
    return <View style={{ flexDirection: 'row' }}>{row}</View>;
  }

  _renderElement(color) {
    return (
      <TouchableOpacity
        key={Math.random()}
        onPress={() => {
          boxOld = this.state.boxes;
          this._shuffleArray(boxOld);
          this.setState({ boxes: boxOld });
        }}
        style={[styles.elementStyle, { backgroundColor: color }]}
      />
    );
  }
  _renderMultipleRows(array) {
    multipleRows = [];

    for (var x = 0; x < array.length; x + 5) {
      //5 is the number of items in a row
      row = this._renderRow(x, array);
      multipleRows.push(row);
    }
    return <View>{multipleRows}</View>;
  }
  render() {
    //rows = this._renderMultipleRows(this.state.boxes);
    //return <View style={styles.container}>{rows}</View>;

    return (
      <View style={styles.container}>
        {this._renderRow(0, this.state.boxes)}
        {this._renderRow(5, this.state.boxes)}
        {this._renderRow(10, this.state.boxes)}
        {this._renderRow(15, this.state.boxes)}
        {this._renderRow(20, this.state.boxes)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  elementStyle: {
    width: Dimensions.get('window').width / 5,
    height: Dimensions.get('window').width / 5,
    borderColor: '#000',
    flexDirection: 'row',
    borderWidth: 2
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  rowStyles: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonStyle: {
    backgroundColor: '#42ff74',
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center'
  }
});

/*
<TouchableOpacity
  style={styles.buttonStyle}

>
  <Text style={{ fontSize: 30 }}>Shuffle</Text>
</TouchableOpacity>
*/
