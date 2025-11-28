import TaskListCard from "~/components/core/tasks/TaskListCard";
import type { Route } from "./+types/home";
import { useState } from "react";
import { PlusIcon } from "@phosphor-icons/react/dist/ssr";
import { AnimatePresence, motion, spring } from "motion/react";
import Deck from "~/components/core/deck/Deck";
import Canvas from "~/components/core/canvas/Canvas";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "ListDesk" },
		{
			name: "description",
			content:
				"ListDesk is (to be) an infinite, free-form canvas for organizing your life with movable to-do lists. Drag, drop, zoom, and arrange tasks anywhere. No strict layouts, just an open desk where you can think visually.",
		},
	];
}

export function loader({ context }: Route.LoaderArgs) {
	return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };
}

export default function Home({ loaderData }: Route.ComponentProps) {
	return (
		<>
			<Canvas />
		</>
	);
}
