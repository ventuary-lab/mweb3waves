/* eslint-disable no-alert */
import {
    invokeScript, broadcast, nodeInteraction, waitForTx,
} from '@waves/waves-transactions';
import { stringToUint8Array, sha256, base58encode } from '@waves/waves-crypto';
import { call } from 'redux-saga/effects';

const dappaddress = '3N5HzCuVFaprA1w6eo9MdFmkCG77foHZu6a';
const baseUri = 'https://testnodes.wavesnodes.com';

window.wc = {
    stringToUint8Array,
    sha256,
    base58encode,
};
window.wt = {
    nodeInteraction,
    invokeScript,
    broadcast,
    waitForTx,
    accountDataById,
    accountData
};

let getProjectsWithStatus = async function(status, account){
    let dapp = "3NBB3iv7YDRsD8ZM2Pw2V5eTcsfqh3j2mvF"
    let key = "author_"
    let data = await accountData(dapp);
    let items = Object.keys(data).filter((x)=> x.includes(key)).map((x)=>x.split(key)[1])
    var collection = []
    for (var i = 0; i < items.length; i++) {
        var info = {}
        var status = ""
        var author = ""
        var ncommits = 0
        var cntyes = 0
        var cntno = 0
        var acc_commit = ""
        var acc_reveal = ""
        var acc_final = ""
        try {
            info = JSON.parse(data["datajson_"+items[i]].value)
        } catch(e) {
            console.log(e);
        }
        try {
            status = data["status_"+items[i]].value
        } catch(e) {
            console.log(e);
        }
        try {
            author = data[key+items[i]].value
        } catch(e) {
            console.log(e);
        }
        try {
            ncommits = data["ncommits_"+items[i]].value
        } catch(e) {
            console.log(e);
        }
        try {
            cntyes = data["cnt_yes_"+items[i]].value
        } catch(e) {
            console.log(e);
        }
        try {
            cntno = data["cnt_no_"+items[i]].value
        } catch(e) {
            console.log(e);
        }

        try {
            acc_commit = data["commit_"+items[i]+ "_" + account].value
        } catch(e) {
            console.log(e);
        }
        try {
            acc_reveal = data["reveal_"+items[i]+ "_" + account].value
        } catch(e) {
            console.log(e);
        }
        try {
            acc_final = data["final_"+items[i]+ "_" + account].value
        } catch(e) {
            console.log(e);
        }

        collection.push({
            item: items[i],
            info: info,
            status: status,
            author: author,
            ncommits: ncommits,
            cntyes: cntyes,
            cntno: cntno,
            acc_commit: acc_commit,
            acc_reveal: acc_reveal,
            acc_final: acc_final
        })
    }
    return collection.filter((x)=>x.status == status)
}
let getItemToVote = function(fresh, voted){
    let getNotVoted = voted.filter((x) => !x.acc_commit).concat(fresh)

    let maxVotes = getNotVoted.reduce(function (previous, key) {
        return Math.max(previous, key.ncommits);
    }, 0);

    return getNotVoted.filter((x) => x.ncommits == maxVotes).pop()
}

let getItemsToAutoReveal = function(voted){
    let getNotRevealed = voted.filter((x) => !x.acc_reveal).concat(fresh)
    let savedRevealTxItemIds = Object.keys(localStorage)
    return getNotRevealed.filter((x) => savedRevealTxItemIds.includes(x.item)).pop()
}

export default async function* wavesInit() {
    try {

        const state = await WavesKeeper.publicState()
        console.log('Waves Keeper data:'); // displaying the result in the console
        console.log(state);

        window.newprojects = await getProjectsWithStatus("new", state.account.address)
        window.commitprojects = await getProjectsWithStatus("voting_commit", state.account.address)
        window.revealprojects = await getProjectsWithStatus("voting_reveal", state.account.address)
        window.featuredprojects = await getProjectsWithStatus("featured", state.account.address) //выбираем проекты за которые положительно проголосовали (они и размещаются на Campaigns)

        window.projectToVote = getItemToVote(state.account.address, window.newprojects, window.commitprojects) // выбираем проект в которых юзер еще не голосовал
        let projectToReveal = getItemsToAutoReveal(window.revealprojects) // выбираем проект в котором юзер уже голосовал и который готовы к раскрытию
        if (projectToReveal) {
            await broadcast(JSON.parse(localStorage[projectToReveal.item])) //забираем из локалстораджа уже подписанную транзакцию "раскрытия"   
        }
        localStorage.removeItem(localStorage[projectToReveal.item]); //удаляем из локалстораджа уже подписанную и отправленую в БЧ транзакцию "раскрытия"


    } catch (error) {
        console.log(error);
        return;
    }

    const { WavesKeeper } = window;
    if (!WavesKeeper) {
        alert('To Auth WavesKeeper should be installed. 2');
        return;
    }

    const authData = { data: 'Auth on my \'Coupon Bazaar\' site' };

    try {
        return;
    } catch (error) {
        console.error(error);
    }

    try {
        const auth = yield call(WavesKeeper.auth, authData);
        console.log(auth);

        return;
    } catch (error) {
        console.error(error);
    }
}
