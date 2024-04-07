import { WalletContext } from '@/context/WalletContext'
import { ok } from 'assert'
import { useSearchParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'

interface propsType {
    planetName: string;
}

const useReycleLength = ({ planetName }: propsType): number | undefined => {
    const searchParams = useSearchParams();
    const query = searchParams.get("preview");
    const [recycleLength, setRecycleLength] = useState<number>()
    const walletContext = useContext(WalletContext)
    let userAddress: string;
    if (query) {
        userAddress = query?.toLowerCase();
    } else {
        userAddress = walletContext?.userAddress?.toLowerCase() || "";
    }

    const getRecycleLength = async () => {

        try {
            const query = `${process.env.NEXT_PUBLIC_URL}/user/getRecycleCount/${userAddress}/${planetName}`
            console.log(query)
            const response = await fetch(query)

            if (response.ok) {
                const data = await response.json();
                console.log("length", data.recycleCountLength)
                setRecycleLength(data);

            }
        } catch (error) {

        }
    }

    useEffect(() => {
        if (userAddress) {
            getRecycleLength()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userAddress, query])




    return recycleLength

}

export default useReycleLength