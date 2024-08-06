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


export const addNFT1 = atom({
    key:"addNft1",
    default:false
})

export const addNFT2 = atom({
    key:"addNft2",
    default:false
})

export const addNFT1Name = atom({
    key:"addNft1Name",
    default:"Earth"
})

export const addnft1Atom = atom({
    key: 'nftAtom1', 
    default: 0
  });

  export const addnft2Atom = atom({
    key: 'nftAtom2', 
    default: 0
  });

export const selectNFTMerge = atom({
    key:"selectNFTAtom",
    default:false
})


export const selectNFTs1 = atom({
    key:"selectNFTs2",
    default:false
})

export const disableIdsAtom = atom<number[]>({
    key: 'disableIdsAtom',
    default: [],
  });

export const updateYourNFTs = atom({
    key:"updateYourNFTs",
    default:false
});