import TaskListCard from "~/components/core/tasks/TaskListCard";
import type { Route } from "./+types/home";
import { useState } from "react";
import { PlusIcon } from "@phosphor-icons/react/dist/ssr";
import { AnimatePresence, motion, spring } from "motion/react";
import Deck from "~/components/core/deck/Deck";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "paperdesk" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export function loader({ context }: Route.LoaderArgs) {
	return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };
}

export default function Home({ loaderData }: Route.ComponentProps) {
	const [list, setList] = useState<{ id: string }[]>([]);
	const [zIndices, setZIndices] = useState<{ [key: string]: number }>({});
	const [zCounter, setZCounter] = useState(1);
	const [nextId, setNextId] = useState(1);

	const bringToFront = (id: string) => {
		setZIndices((prev) => ({
			...prev,
			[id]: zCounter,
		}));
		setZCounter((prev) => prev + 1);
	};

	const newList = () => {
		setList((prev) => [...prev, { id: String(nextId) }]);
		setNextId((prev) => prev + 1);
	};

	const deleteTaskList = (taskListId: string) => {
		setList((prev) => prev.filter((i) => i.id !== String(taskListId)));
	};
	return (
		<>
			<AnimatePresence>
				{list.map((item) => (
					<TaskListCard
						key={item.id}
						id={item.id}
						zIndex={zIndices[item.id] || 0}
						bringToFront={bringToFront}
						deleteTaskList={deleteTaskList}
					/>
				))}
			</AnimatePresence>
			<Deck newList={newList} />
		</>
	);
}
