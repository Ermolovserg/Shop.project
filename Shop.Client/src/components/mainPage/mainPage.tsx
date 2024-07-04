import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { fetchInfo } from '../../redux/productsSlice';
import Loader from '../loader/loader';

const MainPage = () => {
    const dispatch = useAppDispatch();
    const overview = useAppSelector((state) => state.products.overview);
    const loading = useAppSelector((state) => state.products.loading);

    useEffect(() => {
        dispatch(fetchInfo());
    }, [dispatch]);

    return (
        <Container>
            {loading && <Loader />}
            <Title>Shop.Client</Title>
            <Text>В базе данных  {overview?.count} товаров общей стоимостью {overview?.sum} &#8381;</Text>
            <StyledLink to="/products-list">Список товаров</StyledLink>
            <StyledLink to="/admin/auth/login" target='_blank'>Администратор</StyledLink>
        </Container>
    );
};

const Container = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    padding: 0 20px;
    gap: 20px;
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: bold;
    margin: 0;
`;

const Text = styled.p`
    margin: 0;
    padding-bottom: 5px;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #451199;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
        background-color: #5f2c9f;
    }
`;


export default MainPage;