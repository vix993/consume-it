import React from 'react';

import styles from '../styles/components/header.module.css';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
        return (
            <header className={styles.header_wrapper}>
                <h1 className={styles.header_title}>
                    ConsumeIT
                </h1>
                <div className={styles.header_customer_details}>
                    <img
                        src="https://avatars.githubusercontent.com/u/52217652?s=460&u=de9ddf79d4c89c3116a32ed9d498caac323b2beb&v=4"
                        alt="jerries picture"
                    />
                    <span>Jerry</span>
                </div>
            </header>
        );
}