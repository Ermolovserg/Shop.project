import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IProduct } from '../../../../Shared/types';

const ListItem: React.FC<ListItemProps> = ({ product }) => {
    const { id, title, price, thumbnail, comments } = product;

    return (
        <Container>
            <StyledLink to={`/${id}`}>
                <Title>{title}</Title>
                <Image src={thumbnail ? thumbnail.url : "/product-placeholder.png"} alt="placeholder" />
            </StyledLink>
            <Text>{price} &#8381;</Text>
            <Text>Количество комментариев к товару: {comments?.length || 0}</Text>
        </Container>
    );
};

interface ListItemProps {
    product: IProduct;
}

const Container = styled.li`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 250px;
    margin: 0 auto;
    gap: 20px;
    border: 1px solid;
    box-shadow: 10px 5px 5px rgb(81, 106, 175);
    border-radius: 10px;
    padding: 10px;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    display: flex;
    flex-direction: column;
    gap: 20px;
    color: black;
`;

const Title = styled.h2`
    font-size: 18px;
    margin: 0;
`;

const Image = styled.img`
    width: 100%;
    height: 150px;
    object-fit: cover;
`;

const Text = styled.p`
    margin: 0;
    padding-bottom: 5px;
`;


export default ListItem;
