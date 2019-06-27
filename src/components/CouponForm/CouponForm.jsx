import React from 'react';

import {html} from '../../helpers';
import Coupon from '../../components/coupon'
import Counter from '../../components/shared/Counter';
import Button from '../../components/shared/Button';
import Input from '../../components/shared/Input';


import './CouponForm.scss';

const bem = html.bem('CouponForm');

export default class CouponForm extends React.PureComponent {

    voteforproject(vote) {

        let testCommitSaltStatusValues = {
            no: "HXatbtd3THY6FURCGb7PPmogYbQM5ibifg9gtcnDmfAo", // это хэш от строки randomstring1delisted
            yes: "3GAzarVTT2Vt8WdCnJDZKny1grGwwuh76SeWpd4SKJxN"
          }
        let testRevealValues = {
            no: "delisted",
            yes: "featured"
          }
        let tcrRandomSalt = {
            no: "randomstring1",
            yes: "randomstring2"
          }

        const txCommit = { //транзакция коммит
            type: 16,
            data: {
                fee: {
                    assetId: "WAVES",
                    tokens: "0.005"
                },
                dApp: "3NBiXxLpuHVS2dGSaLvyPfCQYMPRKCtGCVg",
                call: {
                    args: [{
                        type: "string",
                        value: window.projectToVote.item
                    },
                    {
                        type: "string",
                        value: testCommitSaltStatusValues[vote]
                    }
                ],
                    function: "votecommit"
                },
                payment: [{
                    tokens: "0.03", //2*let VOTEBET = 150000000/1000
                    assetId: null
                }]
            }
        };

        const txReveal = { //отложеная ревеал транзакция
            type: 16,
            data: {
                fee: {
                    assetId: "WAVES",
                    tokens: "0.005"
                },
                dApp: "3NBiXxLpuHVS2dGSaLvyPfCQYMPRKCtGCVg",
                call: {
                    args: [{
                        type: "string",
                        value: window.projectToVote.item
                    },
                    {
                        type: "string",
                        value: testRevealValues[vote]
                    },
                    {
                        type: "string",
                        value: testCommitSaltStatusValues[vote]
                    }
                ],
                    function: "votereveal"
                },
                payment: []
            }
        };
        
        let txCommit = await WavesKeeper.signTransaction(txCommit); //кипер подпишет сразу пачку
        let txReveal = await WavesKeeper.signTransaction(txReveal); //кипер подпишет сразу пачку

        let result = await window.wt.broadcast(JSON.parse(signedTx4), "https://testnodes.wavesnodes.com");
        localStorage.setItem(testCommitSaltStatusValues[vote], txReveal); //  положили в локалсторадж 
    }

    render() {
        return (
            <div className={bem.block()}>
                <div className={bem.element('inner')}>
                    <div className={bem.element('col-left')}>
                        <div className={bem.element('coupon-card')}>
                            <Coupon
                                width={{ 0: '100%', md: '300px' }}
                                height="300px"
                                couponPrice={2}
                                couponTerm="WAVES"
                                discount={10}
                                id={1}
                                image="https://cdn1.savepice.ru/uploads/2019/6/5/f083cab4bf636dbe751636671a40dbd0-full.png"
                                longDescription="Wow! Famous airpods headphones from the company Apple"
                                longTitle="Lorem Impusm..."
                                name="Apple AirPods"
                                newPrice="143.1"
                                oldPrice="159"
                                priceTerm="$"
                                rating={4}
                                ratings={195}
                                shortDescription="WooooW!The best, bla bla bla"
                                status="purchased"
                                title="Megaplaza"
                            />

                        </div>
                        <div className={bem.element('counter')}>
                            <Counter/>
                        </div>
                    </div>
                    <div className={bem.element('col-right')}>
                        <form
                            className={bem.element('form')}
                            action={''}
                        >
                            <div className={bem.element('form-row')}>
                                <div className={bem.element('form-col')}>
                                    <Input
                                        label={'Image url'}
                                        name={'imageUrl'}
                                        placeholder={'http://'}
                                    />
                                </div>
                            </div>
                            <div className={bem.element('form-row')}>
                                <div className={bem.element('form-col', 'third')}>
                                    <Input
                                        label={'Old price'}
                                        name={'oldPrice'}
                                    />
                                </div>
                                <div className={bem.element('form-col', 'third')}>
                                    <Input
                                        label={'New price'}
                                        name={'newPrice'}
                                    />
                                </div>
                                <div className={bem.element('form-col', 'third')}>
                                    <Input
                                        label={'Coupon price'}
                                        name={'couponPrice'}
                                    />
                                </div>
                            </div>
                            <div className={bem.element('form-row')}>
                                <div className={bem.element('form-col')}>
                                    <Input
                                        label={'Title'}
                                        name={'title'}
                                        placeholder={'http://'}
                                    />
                                </div>
                            </div>
                            <div className={bem.element('form-row')}>
                                <div className={bem.element('form-col', 'third')}>
                                    <Input
                                        label={'Expiration date'}
                                        name={'expirationDate'}
                                    />
                                </div>
                                <div className={bem.element('form-col', '2-third')}>
                                    <Input
                                        label={'Location'}
                                        name={'location'}
                                    />
                                </div>
                            </div>
                            <div className={bem.element('form-row')}>
                                <div className={bem.element('form-col')}>
                                    <Input
                                        label={'Item url'}
                                        name={'itemUrl'}
                                        placeholder={'http://'}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className={bem.element('footer')}>
                    <Button
                        onClick = {() => voteforproject("no")}
                        action={'cancel'}
                        label={'No'}
                    />
                    <Button
                        onClick = {() => voteforproject("yes")}
                        action={'save'}
                        label={'Yes'}
                    />
                </div>
            </div>
        );
    }
}
