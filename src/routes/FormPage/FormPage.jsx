import React from 'react';

import {html} from '../../helpers';

import CouponForm from '../../components/CouponForm';
import Layout from '../../containers/Layout';
import './FormPage.scss';

const bem = html.bem('FormPage');

const FormPage = () => {

    return (
        <Layout>
            <div className={bem.block()}>
                <div className={bem.element('title')}>
                    Add
                </div>
                <div className={bem.element('sub-title')}>
                    Your trading card will be formed here
                </div>
                <div className={bem.element('form')}>
                    <CouponForm/>
                </div>
            </div>
        </Layout>
    );
};

export default FormPage;
