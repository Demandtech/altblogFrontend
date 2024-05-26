import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Skeleton,
} from "@nextui-org/react";

const PostCardSkeleton = () => {
	return (
		<Card className="dark:bg-black dark:border-none dark:shadow-sm border flex shadow-sm flex-col items-start">
			<CardHeader className="gap-2">
				<Skeleton className="h-5 w-16 rounded-lg" />
				<Skeleton className="h-5 w-10 rounded-lg" />
				<Skeleton className="h-5 w-10 rounded-lg" />
				<Skeleton className="h-5 w-10 rounded-lg" />
				<Skeleton className="h-5 w-3 rounded-sm ml-auto" />
			</CardHeader>
			<CardBody>
				<div className="w-full flex flex-col gap-2 ">
					<Skeleton className="h-16 w-4/5 rounded-lg" />
				</div>
			</CardBody>
			<CardFooter>
				<div>
					<Skeleton className="flex rounded-full w-12 h-12" />
				</div>
				<div className="w-full flex flex-col gap-2 ml-2">
					<Skeleton className="h-3 w-1/5 rounded-lg" />
					<Skeleton className="h-3 w-1/5 rounded-lg" />
				</div>

				<Skeleton className="h-8 w-11 rounded-full" />
				<Skeleton className="h-8 w-11 rounded-full mx-2" />
				<Skeleton className="h-8 w-11 rounded-full" />
			</CardFooter>
		</Card>
	);
};

export default PostCardSkeleton;
