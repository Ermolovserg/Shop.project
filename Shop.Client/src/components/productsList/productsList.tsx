import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ListItem from '../listItem/listItem';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { fetchProducts, fetchFilteredProducts } from '../../redux/productsSlice';
import Loader from '../loader/loader';

const ProductsList = () => {
    const dispatch = useAppDispatch();
    const products = useAppSelector((state) => state.products.products);
    const loading = useAppSelector((state) => state.products.loading);
    const [filter, setFilter] = useState({
        title: '',
        description: '',
        priceFrom: 0,
        priceTo: 100000000000,
    });

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilter((prevFilter) => ({
            ...prevFilter,
            [name]: value,
        }));
    };

    const handleFilterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(fetchFilteredProducts(filter));
    };

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        console.log('Filter changed:', filter);
    }, [filter]);

    console.log('Products in app:', products);

    return (
        <Container>
            <Title>Список товаров ({products.length})</Title>
            <Form onSubmit={handleFilterSubmit}>
                <Input type="text" placeholder="Название товара" name="title" onChange={handleFilterChange} />
                <Input type="text" placeholder="Описание товара" name="description" onChange={handleFilterChange} />
                <Input type="number" placeholder="Цена от" name="priceFrom" onChange={handleFilterChange} />
                <Input type="number" placeholder="Цена до" name="priceTo" onChange={handleFilterChange} />
                <Button>Поиск</Button>
            </Form>
            {loading && <Loader />}
            <List>
                {products.length > 0 ? (
                    products.map((product) => <ListItem key={product.id} product={product} />)
                ) : (
                    <p>No products found</p>
                )}
            </List>
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

const Form = styled.form`
    display: flex;
    width: 100%;
    justify-content: space-between;
    gap: 10px;
`;

const Input = styled.input`
    padding: 10px;
    width: 100%;
    border: 1px solid rgb(81, 106, 175);
    border-radius: 5px;
`;

const Button = styled.button`
    padding: 10px 20px;
    background-color: rgb(81, 106, 175);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: rgb(61, 86, 155);
    }
`;

const List = styled.ul`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    list-style: none;
    gap: 15px 30px;
    padding: 0;
`;

export default ProductsList;
