import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { fetchProductById, saveComment } from '../../redux/productsSlice';
import Loader from '../loader/loader';
import { Link } from 'react-router-dom';

const Product = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const product = useAppSelector((state) => state.products.productById);
    const loading = useAppSelector((state) => state.products.loading);
    const { title, description, price, thumbnail, comments, images, similarProducts } = product;
    const [comment, setComment] = useState({
        name: '',
        email: '',
        body: '',
    });

    const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (id !== undefined) {
            const commentSet = { ...comment, productId: id };
            dispatch(saveComment(commentSet));
            setComment({
                name: '',
                email: '',
                body: '',
            });
            dispatch(fetchProductById(id));
        }
    };

    const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setComment((prevComment) => ({
            ...prevComment,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (id !== undefined) {
            dispatch(fetchProductById(id));
        }
    }, [id, dispatch]);

    return (
        <Container>
            {loading && <Loader />}
            <Title>{title}</Title>
            <MainImg src={thumbnail ? thumbnail.url : '/product-placeholder.png'} alt="placeholder" />
            {images && (
                <List>
                    {images.map((image, index) => (
                        <li key={index}>
                            <SmallImg src={image.url} alt={`placeholder ${index}`} />
                        </li>
                    ))}
                </List>
            )}

            <Text>{description}</Text>
            <Price>{price} &#8381;</Price>
            {similarProducts && (
                <List>
                    Похожие товары
                    {similarProducts.map((product) => (
                        <li key={product.id}>
                            <SimilarProduct to={`/${product.id}`}>
                                <Text>{product.title}</Text>
                                <Price>{product.price} &#8381;</Price>
                            </SimilarProduct>
                        </li>
                    ))}
                </List>
            )}

            {comments && (
                <CommentsList>
                    Список комментариев
                    {comments.map((comment, index) => (
                        <CommentContainer key={index}>
                            <Text>Name: {comment.name}</Text>
                            <Text>Email: {comment.email}</Text>
                            <Text>{comment.body}</Text>
                        </CommentContainer>
                    ))}
                </CommentsList>
            )}

            <Form onSubmit={handleCommentSubmit}>
                <Input type="text" name='name' placeholder="Заголовок" onChange={handleCommentChange} value={comment.name} />
                <Input type="text" name='email' placeholder="Email" onChange={handleCommentChange} value={comment.email} />
                <TextArea name='body' placeholder="Ваш комментарий" onChange={handleCommentChange} value={comment.body} />
                <Button>Сохранить</Button>
            </Form>
        </Container>
    );
};

const Container = styled.main`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0 auto;
    gap: 20px;
`;

const Title = styled.h2`
    font-size: 24px;
    font-weight: bold;
    margin: 0;
`;

const MainImg = styled.img`
    width: auto;
    height: 300px;
    object-fit: cover;
`;

const List = styled.ul`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
`;

const SmallImg = styled.img`
    width: 100px;
    height: 100px;
    object-fit: cover;
`;

const Text = styled.p`
    margin: 0;
    padding-bottom: 5px;
    text-align: left;
`;

const Price = styled.p`
    font-size: 18px;
    font-weight: bold;
    margin: 0;
`;

const SimilarProduct = styled(Link)`
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: black;
    width: 150px;
    border: 1px solid;
    box-shadow: 5px 2px 2px rgb(81, 106, 175);
    border-radius: 10px;
    padding: 10px;
    cursor: pointer;

    &:hover {
        background-color: #f0f0f0;
    }
`;

const CommentsList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 10px;
    list-style: none;
    padding: 0;
`;

const CommentContainer = styled.li`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    border: 1px solid;
    box-shadow: 5px 2px 2px rgb(81, 106, 175);
    border-radius: 10px;
    padding: 10px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
`;

const Input = styled.input`
    padding: 10px;
    width: 100%;
    border: 1px solid rgb(81, 106, 175);
    border-radius: 5px;
`;

const TextArea = styled.textarea`
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


export default Product;
