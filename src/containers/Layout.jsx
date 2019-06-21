import React, { useState, useEffect } from 'react';

import { Header, Footer } from '.';
import { useAppDialogs } from '../components/service';
import { getCoupons } from '../api';


const Layout = (props) => {
    const {
        form: [onFormOpen],
    } = useAppDialogs();

    const [updateCoupons] = useState([]);
    const [updateUserCoupons] = useState([]);
    const [filterActive, changeFilterState] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const response = await getCoupons();
            updateCoupons(response);

            updateUserCoupons([response[0]]);
        }
        fetchData();
    }, []);

    return (
        <>
            <Header
                onCreateCoupon={onFormOpen}
                filterActive={filterActive}
                onChangeFilterState={changeFilterState}
            />
                {props.children}
            <Footer />
        </>
    );
};

export default Layout;
