import React from 'react';
import {WebView} from 'react-native-webview';
import PropTypes from 'prop-types';

// import { Container } from './styles';

export default function Repository({navigation, route}) {
    navigation.setOptions({
        title: route.params.data.name,
    });
    const url = route.params.data.html_url;

    return <WebView source={{uri: url}} />;
}
Repository.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
        setOptions: PropTypes.func,
    }).isRequired,
    route: PropTypes.shape().isRequired,
};
