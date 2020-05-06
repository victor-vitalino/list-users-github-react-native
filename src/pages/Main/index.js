import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Container, Form, Input, SubmitButton} from './styles';

export default function Main({navigation}) {
    return (
        <Container>
            <Form>
                <Input
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Adicionar usuário"
                />
                <SubmitButton>
                    <Icon name="add" size={30} color="#fff" />
                </SubmitButton>
            </Form>
        </Container>
    );
}
