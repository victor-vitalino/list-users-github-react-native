import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator} from 'react-native';
import api from '../../services/api';

import {
    Container,
    Header,
    Avatar,
    Name,
    Bio,
    Stars,
    Starred,
    OwnerAvatar,
    Info,
    Title,
    Author,
    LoadingView,
} from './styles';

export default function User({navigation, route}) {
    const [stars, setStars] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefresh] = useState(false);
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    navigation.setOptions({
        title: route.params.user.name,
    });

    const handleRequestApi = async () => {
        const {login} = route.params.user;
        return api.get(`/users/${login}/starred?page=${page}`);
    };
    const handleStars = async () => {
        setLoading(true);
        const response = await handleRequestApi();
        setStars(response.data);
        setLoading(false);
    };

    const loadMore = async () => {
        setLoadingMore(true);
        setPage(page + 1);
        const response = await handleRequestApi();
        setStars([...stars, response.data]);
        setLoadingMore(false);
    };
    const footerComponent = () => {
        if (!loadingMore) return null;
        return (
            <LoadingView>
                <ActivityIndicator size={40} color="#3498db" />
            </LoadingView>
        );
    };
    const refreshList = async () => {
        setRefresh(true);
        setPage(1);
        const response = await handleRequestApi();
        setStars(response.data);
        setRefresh(false);
    };
    useEffect(() => {
        handleStars();
    }, []);

    const {user} = route.params;
    return (
        <Container>
            <Header>
                <Avatar source={{uri: user.avatar}} />
                <Name>{user.name}</Name>
                <Bio>{user.bio}</Bio>
            </Header>
            {loading ? (
                <LoadingView>
                    <ActivityIndicator size={40} color="#3498db" />
                </LoadingView>
            ) : (
                <Stars
                    data={stars}
                    onEndReachedThreshold={0.2}
                    onEndReached={loadMore}
                    ListFooterComponent={footerComponent}
                    keyExtractor={(star) => String(star.id)}
                    onRefresh={refreshList} // Função dispara quando o usuário arrasta a lista pra baixo
                    refreshing={refreshing}
                    renderItem={({item}) => (
                        <Starred>
                            <OwnerAvatar
                                source={{uri: item.owner.avatar_url}}
                            />
                            <Info>
                                <Title>{item.name}</Title>
                                <Author>{item.owner.login}</Author>
                            </Info>
                        </Starred>
                    )}
                />
            )}
        </Container>
    );
}

User.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
        setOptions: PropTypes.func,
    }).isRequired,
    route: PropTypes.shape().isRequired,
};
