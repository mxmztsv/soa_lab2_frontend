import React, { useState } from 'react';
import styles from './Header.module.css';
import { Container } from '../Container/Container';
import {Link} from "react-router-dom";

export const Header = ({
    backgroundColor = 'transparent',
}) => {
    return (
        <header className={styles.header} style={{ backgroundColor }}>
            <Container>
                <div className={styles.headerInnerContainer}>
                    <Link to={'/'} className={styles.logo}><span className="yellow">LAB2</span>SOA</Link>
                    <p className={styles.name}>Максим Зайцев <span className="yellow">P34101</span></p>
                </div>
            </Container>
        </header>
    );
};
