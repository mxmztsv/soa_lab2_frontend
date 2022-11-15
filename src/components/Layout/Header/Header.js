import React, { useState } from 'react';
import styles from './Header.module.css';
import { Container } from '../Container/Container';

export const Header = ({
    backgroundColor = 'transparent',
}) => {
    return (
        <header className={styles.header} style={{ backgroundColor }}>
            <Container>
                <div className={styles.headerInnerContainer}>
                    <p className={styles.logo}><span className="yellow">LAB2</span>SOA</p>
                    <p className={styles.name}>Максим Зайцев <span className="yellow">P34101</span></p>
                </div>
            </Container>
        </header>
    );
};
