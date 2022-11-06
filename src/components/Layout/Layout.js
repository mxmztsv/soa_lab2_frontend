import React from 'react';
import { Container } from './Container/Container';
import { Header } from './Header/Header';
import styles from './Layout.module.css';

export const Layout = ({
    headerBackgroundColor = 'transparent',
    children = null,
}) => {
    return (
        <div className={styles.layout}>
            <Header backgroundColor={headerBackgroundColor} />
            <Container>{children}</Container>
        </div>
    );
};
