import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Pressable} from 'react-native';
import Colors from '../Util/Colors';

const IconButton = ({onPress, icon}) => {
  return (
    <Pressable onPress={onPress}>
      <FontAwesomeIcon icon={icon} color={Colors.titleSecondary} size={20} />
    </Pressable>
  );
};

export default IconButton;
