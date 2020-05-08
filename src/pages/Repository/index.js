import React from 'react';
import {WebView} from 'react-native-webview';
import PropTypes from 'prop-types';

// import { Container } from './styles';

export default function Repository({navigation, route}) {
    return (
        <WebView
            source={{uri: 'https://infinite.red'}}
            style={{marginTop: 20}}
        />
    );
}
Repository.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
        setOptions: PropTypes.func,
    }).isRequired,
    route: PropTypes.shape().isRequired,
};
