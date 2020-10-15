import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  TouchableNativeFeedback
} from 'react-native';

import C9Colors from './C9Colors';

type Props = {
  text?: string,
  image?: any,
  style?: any,
  textStyle?: any,
  imageStyle?: any,
  onPress?: () => void | any,
  onPressIn?: () => void,
  onPressOut?: () => void,
  href?: string,
  initialProps?: Object,
  options?: Object,
  backgroundColorIOS?: string,
  highlighted?: boolean,
  disabled?: boolean,
  numberOfLines?: number,
  tintColor?: string,
}

type State = {
}

export function BarButton({style, disabled, ...props}: Props) {
  return (
    <C9Button
      disabled={disabled}
      style={[styles.barButton, style]}
      {...props}
    />
  );
}

export function PillButton({style, textStyle, imageStyle, ...props}: Props) {
  const { highlighted } = props;
  if (highlighted != null && highlighted) {
    return (<C9Button
      style={[styles.pillButtonHl, style]}
      textStyle={[styles.pillButtonTextHl, textStyle]}
      imageStyle={[styles.pillButtonImageHl, imageStyle]}
      {...props} />);
  }
  return (<C9Button
    style={[styles.pillButton, style]}
    textStyle={textStyle}
    imageStyle={imageStyle}
    {...props} />);
}

export function BackButton({style, textStyle, text, ...props}: Props) {
  var backIcon = (Platform.OS == 'ios' ?
                  require('../img/icon-back.png') : require('../img/icon-back-android.png'));
  return (
    <C9Button
      text={ text != null ? text : "Back" }
      image={backIcon}
      style={[styles.backButton, style]}
      textStyle={[styles.backText, textStyle]}
      {...props}
    />
  );
}

export function CloseButton({style, textStyle, ...props}: Props) {
  var backIcon = require('../img/nav-close.png');
  return (
    <C9Button
      text=""
      image={backIcon}
      style={[styles.closeButton, style]}
      textStyle={[styles.backText, textStyle]}
      {...props}
    />
  );
}

export default class C9Button extends Component<Props, State> {
  static defaultProps = {
    numberOfLines: 1,
  }

  _onPress() {
    if (this.props.onPress != null) {
      this.props.onPress();
    }
    const {
      href,
    } = this.props;
    if (href) {
      window.location.href = href;
    }
  }

  render() {
    const { text, image, style, textStyle, imageStyle, tintColor } = this.props;
    var imageEl;
    let backgroundColor = 'transparent';
    if (Platform.OS === 'ios') {
      backgroundColor = this.props.backgroundColorIOS || 'transparent';
    }
    if (image) {
      let imgStyles = [styles.img, {backgroundColor}, imageStyle];
      if (tintColor) {
        imgStyles.push({ tintColor });
      }
      imageEl = (
        <Image source={image} style={imgStyles}/>
      );
    }
    let txtStyles = [styles.text, {backgroundColor}, textStyle];
    if (tintColor) {
      txtStyles.push({ color: tintColor });
    }
    var textEl = (
      <Text style={txtStyles} numberOfLines={this.props.numberOfLines}>{text}</Text>
    );

    if(Platform.OS === 'ios') {
      return (
        <TouchableOpacity
          disabled={this.props.disabled}
          onPress={this._onPress.bind(this)}
          onPressIn={this.props.onPressIn}
          onPressOut={this.props.onPressOut}
          style={[
            {alignItems: 'center', justifyContent: 'center'},
            styles.wrapper,
            {backgroundColor},
            style,
          ]}
        >
          {imageEl}
          {textEl}
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableNativeFeedback
          disabled={this.props.disabled}
          background={TouchableNativeFeedback.SelectableBackground()}
          onPress={this._onPress.bind(this)}
          onPressIn={this.props.onPressIn}
          onPressOut={this.props.onPressOut}
        >
          <View style={[{alignItems: 'center', justifyContent: 'center'}, styles.wrapper, style]}>
            {imageEl}
            {textEl}
          </View>
        </TouchableNativeFeedback>
      );
    }

  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'center',
  },
  text: {
    color: C9Colors.glowPurple,
    fontSize: 13,
    flexShrink: 1,
  },
  backText: {
    fontSize: 17,
  },
  img: {
    resizeMode: 'contain',
  },
  barButton: {
    height: 50,
    borderRadius: 4,
    backgroundColor: C9Colors.glowPurple,
  },
  pillButton: {
    paddingLeft: 16,
    paddingRight: 16,
    height: 32,
    borderColor: C9Colors.pillButtonBorder,
    backgroundColor: 'white',
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    borderWidth: Platform.OS === 'android' && Platform.Version >= 21 ? 0 : StyleSheet.hairlineWidth,
    elevation: Platform.OS === 'android' ? 2 : 0,
  },
  pillButtonHl: {
    paddingLeft: 16,
    paddingRight: 16,
    height: 32,
    //borderColor: C9Colors.pillButtonBorder,
    backgroundColor: C9Colors.glowPurple,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    //borderWidth: Platform.OS === 'ios' ? StyleSheet.hairlineWidth : 0,
    elevation: Platform.OS === 'android' ? 2 : 0,
  },
  pillButtonTextHl: {
    color: 'white',
  },
  pillButtonImageHl: {
    tintColor: 'white',
  },
  backButton: {
    ...Platform.select({
      android: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16,
        paddingRight: 16,
      },
    })
  },
  closeButton: {
    ...Platform.select({
      android: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16,
        paddingRight: 16,
      },
      ios: {
        paddingHorizontal: 8,
      }
    })
  }
});
