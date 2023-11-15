import { Skeleton } from "@nextui-org/react";
export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <Skeleton className="rounded-lg" >
            <div className="w-full "></div>
        </Skeleton>
    )
}