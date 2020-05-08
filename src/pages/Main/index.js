import React, {useState, useEffect} from 'react';
import {Keyboard, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import AsyncStorage from '@react-native-community/async-storage';

import {
    Container,
    Form,
    Input,
    SubmitButton,
    List,
    User,
    Avatar,
    Name,
    Bio,
    ProfileButton,
    ProfileButtonText,
} from './styles';
import api from '../../services/api';

export default function Main({navigation}) {
    const [users, setUsers] = useState([]);
    const [NewUser, setNewUser] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function LoadData() {
            const data = await AsyncStorage.getItem('users');
            if (data) setUsers(JSON.parse(data));
        }
        LoadData();
    }, []);

    useEffect(() => {
        const addData = async () =>
            AsyncStorage.setItem('users', JSON.stringify(users));
        addData();
    }, [users]);
    const handleAddUser = async () => {
        setLoading(true);
        Keyboard.dismiss();
        const response = await api.get(`/users/${NewUser}`);
        const dados = {
            name: response.data.name,
            login: response.data.login,
            bio: response.data.bio,
            avatar: response.data.avatar_url,
        };

        setNewUser('');
        setUsers([...users, dados]);
        setLoading(false);
    };
    return (
        <Container>
            <Form>
                <Input
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Adicionar usuário"
                    onChangeText={(text) => setNewUser(text)}
                    value={NewUser}
                    returnKeyType="send"
                    onSubmitEditing={() => handleAddUser()}
                />
                <SubmitButton loading={loading} onPress={() => handleAddUser()}>
                    {loading ? (
                        <ActivityIndicator />
                    ) : (
                        <Icon name="add" size={30} color="#fff" />
                    )}
                </SubmitButton>
            </Form>
            <List
                data={users}
                keyExtractor={(user) => user.login}
                renderItem={({item}) => (
                    <User>
                        <Avatar source={{uri: item.avatar}} />
                        <Name>{item.name}</Name>
                        <Bio>{item.bio}</Bio>
                        <ProfileButton
                            onPress={() => {
                                navigation.navigate('User', {user: item});
                            }}>
                            <ProfileButtonText>Ver Perfil</ProfileButtonText>
                        </ProfileButton>
                    </User>
                )}
            />
        </Container>
    );
}

Main.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
    }).isRequired,
};
