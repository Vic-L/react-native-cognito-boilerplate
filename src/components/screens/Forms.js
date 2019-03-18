import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import {
  Text,
} from 'react-native';
import styled from 'styled-components';

import FormContainer from '../elements/FormContainer';
import ImageField from '../forms/ImageField';
import TextField from '../forms/TextField';
import DateTimePicker from '../forms/DateTimePicker';
import NoTouchFieldWrapper from '../forms/NoTouchFieldWrapper';

const ImageContainer = styled.View`
  background-color: blue;
  width: 150px;
  height: 150px;
`;

const Image = styled.Image`
  width: 100%;
  height: undefined; /* https://stackoverflow.com/a/53482563/2667545 */
  aspect-ratio: 1;
`;

class Forms extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageBase64: null,
      // randomly set initial image path (edit vs create)
      imagePath: [
        'https://store.donanimhaber.com/ae/0c/c4/ae0cc4f398e19a24a9b0434dcec0c365.png',
        null,
      ][Math.floor(Math.random() * 2)],
      textFieldValue: null,
      date: new Date(),
      shouldShowDatePicker: false,
    };

    this.onCropped = this.onCropped.bind(this);
    this.onChangeTextField = this.onChangeTextField.bind(this);
    this.onChangeDateField = this.onChangeDateField.bind(this);
    this.onDoneDatePicker = this.onDoneDatePicker.bind(this);
    this.onCancelDatePicker = this.onCancelDatePicker.bind(this);
  }

  onCropped(imageBase64, imagePath) {
    this.setState({ imageBase64, imagePath });
  }

  onChangeTextField(textFieldValue) {
    this.setState({ textFieldValue });
  }

  onChangeDateField(date) {
    this.setState({ date });
  }

  onDoneDatePicker() {
    this.setState({ shouldShowDatePicker: false });
  }

  onCancelDatePicker() {
    this.setState({ shouldShowDatePicker: false });
  }

  render() {
    const {
      imagePath,
      imageBase64,
      textFieldValue,
      date,
      shouldShowDatePicker,
    } = this.state;

    return (
      <React.Fragment>
        <FormContainer>
          <Text>Forms</Text>

          <Text>ImageField</Text>
          <ImageField
            title="Add image"
            message="Description of what this image is for"
            onCropped={this.onCropped}
          >
            {() => {
              let image = null;
              if (
                _.isNull(imagePath)
                && _.isNull(imageBase64)
              ) {
                image = <Image source={require('../../images/icons/magnifying_glass.jpg')} />;
              } else {
                image = <Image source={{ uri: imagePath }} />;
              }

              return (
                <ImageContainer>
                  {image}
                </ImageContainer>
              );
            }}
          </ImageField>

          <Text>TextField</Text>
          <TextField
            label="LABEL"
            value={textFieldValue}
            error={null}
            placeholder="Placeholder"
            onChangeText={this.onChangeTextField}
          />

          <Text>DateField</Text>
          <NoTouchFieldWrapper
            onPress={() => {
              const { shouldShowDatePicker: showingDatePicker } = this.state;
              this.setState({
                shouldShowDatePicker: !showingDatePicker,
              });
            }}
          >
            {() => (
              <TextField
                label="DATE"
                value={moment(date).format('YYYY-MM-DD')}
                error={null}
                placeholder="Date placeholder"
                onChangeText={this.onChangeDateField}
              />
            )}
          </NoTouchFieldWrapper>

        </FormContainer>
        {
          shouldShowDatePicker
            ? (
              <DateTimePicker
                onDone={this.onDoneDatePicker}
                onCancel={this.onCancelDatePicker}
                date={date}
                mode="date"
                onDateChange={this.onChangeDateField}
              />
            )
            : null
        }
      </React.Fragment>
    );
  }
}

export default Forms;
