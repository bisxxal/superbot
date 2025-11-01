import { userModels } from "@/action/user.action";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useGetModels = () => {
    const [localData, setLocalData] = useState<[]>();
    const [isCheckingLocal, setIsCheckingLocal] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem('models');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setLocalData(parsed);
            } catch (error) {
            }
        }
        setIsCheckingLocal(false);
    }, []);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['modelsinfo'],
        queryFn: async () => {
            const fetched = await userModels();
            localStorage.setItem('models', JSON.stringify(fetched));
            setLocalData(fetched);
            return fetched;
        },
        enabled: !isCheckingLocal && localData === null,
    });

    // console.log(data)
    useEffect(() => {
        if (data) {
            setLocalData(data);
        }
    }, [data]);

    console.log(data)
    return {
        data: localData,
        isLoading: isCheckingLocal || (localData === null && isLoading),
        refetchTimeTable: refetch,
    };
};