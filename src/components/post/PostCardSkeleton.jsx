import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Skeleton,
} from "@nextui-org/react";

const PostCardSkeleton = () => {
	return (
		<Card className="bg-[#f1f1f1] dark:bg-dark80 dark:shadow-sm flex shadow-sm flex-col items-start">
			<CardHeader className="gap-2">
				<Skeleton className="h-4 w-[75px] rounded-sm" />
				<Skeleton className="h-5 w-10 rounded-large" />
				<Skeleton className="h-5 w-10 rounded-large" />
				<Skeleton className="h-5 w-10 rounded-large" />
				<Skeleton className="h-5 w-3 rounded-sm ml-auto" />
			</CardHeader>
			<CardBody>
				<div className="w-full flex flex-col gap-2 ">
					<Skeleton className="h-16 w-4/5 rounded-lg" />
				</div>
			</CardBody>
			<CardFooter>
				<div>
					<Skeleton className="flex rounded-full w-10 h-10" />
				</div>
				<div className="w-full flex flex-col gap-1 ml-2">
					<Skeleton className="h-3 max-w-[120px] rounded-lg" />
					<Skeleton className="h-3 w-[140px] rounded-lg" />
				</div>

				<Skeleton className="h-[21px] w-[28px] rounded-full" />
				<Skeleton className="h-[21px] w-[28px] rounded-full mx-2" />
				<Skeleton className="h-[21px] w-[28px] rounded-full" />
			</CardFooter>
		</Card>
	);
};

export default PostCardSkeleton;
