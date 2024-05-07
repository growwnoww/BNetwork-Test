import { useWeb3ModalAccount } from '@web3modal/ethers5/react'
import {atom} from 'recoil'


export const hamaburgerAtom = atom({
    key:"hamabugerAtom",
    default:false
})

export const menuAtom = atom({
    key:"menuAtom",
    default:true
})

export const homeHamaburgerAtom = atom({
    key:"homeHamaburger",
    default:false
})

export const currentUser = atom({
    key:"currentUserAtom",
    default:''
})