import {
	CheckFat,
	CheckFatIcon,
	CheckIcon,
	CheckSquareOffsetIcon,
	DotsThreeCircleVerticalIcon,
	DotsThreeOutlineVerticalIcon,
	DotsThreeVerticalIcon,
	HamburgerIcon,
	ListIcon,
	PaintBrushIcon,
	PlusIcon,
	TrashIcon,
} from "@phosphor-icons/react";
import Task from "./Task";
import { useEffect, useRef, useState, type Ref } from "react";
import { AnimatePresence, color, motion, number } from "motion/react";
import Draggable from "react-draggable";
import { DropdownMenu } from "radix-ui";
import {
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuRoot,
	DropdownMenuSubTrigger,
} from "~/components/dropdown/DropdownMenu";
import { canvas, col, div } from "motion/react-client";
import AutosizeTextarea from "~/components/core/tasks/form/TaskListName";
import TaskListName from "~/components/core/tasks/form/TaskListName";

interface TaskListCardProps {
	id: string;
	zIndex: number;
	bringToFront: (id: string) => void;
	deleteTaskList: (id: string) => void;

	wrapperHeight: number;
	wrapperWidth: number;
	canvasPosition: React.RefObject<{ x: number; y: number }>;
}

const TaskListCard = ({
	id,
	zIndex,
	bringToFront,
	deleteTaskList,
	wrapperHeight,
	wrapperWidth,
	canvasPosition,
}: TaskListCardProps) => {
	const [list, setList] = useState<{ id: string }[]>([]);
	const [taskListName, setTaskListName] = useState("New Task List");

	const cardParentRef = useRef<HTMLDivElement>(null);
	const cardRef = useRef<HTMLDivElement>(null);

	const [cardHeight, setCardHeight] = useState(0);
	const [cardWidth, setCardWidth] = useState(0);

	const positionRef = useRef({ x: 0, y: 0 });
	const draggingRef = useRef(false);
	const offsetRef = useRef({ x: 0, y: 0 });

	const [ready, setReady] = useState(false);

	// spawn new task at center of viewport

	useEffect(() => {
		setReady(true);
	}, []);

	useEffect(() => {
		if (!ready || !cardParentRef.current) return;

		setListColor("white");

		const rect = cardParentRef.current.getBoundingClientRect();
		cardParentRef.current.style.transform = `translate(${wrapperWidth / 2 - rect.width / 2 - canvasPosition.current.x}px, ${wrapperHeight / 2 - rect.height / 2 - canvasPosition.current.y}px)`;
	}, [ready]);

	// task list colors

	const [listColor, setListColor] = useState("");

	const setTaskListColor = (color: string) => {
		setListColor(color);

		if (!cardParentRef.current) return;
		cardParentRef.current.classList.add("note-transition");

		setTimeout(() => {
			if (!cardParentRef.current) return;
			cardParentRef.current.classList.remove("note-transition");
		}, 200);
	};

	// task list theme colors

	let listBgColor: string = "";
	let listBorderColor: string = "";
	let listShadowColor: string = "";
	let listDotsColor: string = "";

	let listTextColor: string = "";

	let listHoverColor: string = "";
	let listActiveColor: string = "";
	let listDropdownOpenColor: string = "";

	let listTitleTextColor: string = "";
	let listTitlePlaceholderTextColor: string = "";

	let listTitleRingHoverColor: string = "";
	let listTitleRingFocusColor: string = "";
	let listTitleRingPeerHoverColor: string = "";

	let listTitleNewTaskTextColor: string = "";
	let listTitleNewTaskHoverColor: string = "";
	let listTitleNewTaskActiveColor: string = "";

	const taskListColors: { color: string; hex: string }[] = [
		{ color: "White", hex: "#ffffff" },
		{ color: "Peach", hex: "#ffe7d6" },
		{ color: "Yellow", hex: "#fff9c4" },
		{ color: "Blue", hex: "#dcebff" },
		{ color: "Red", hex: "#f8c8c8" },
	];

	switch (listColor) {
		// white theme
		case "white":
			listBgColor = "bg-white";
			listBorderColor =
				"color-mix(in srgb, var(--color-slate-500), transparent 88%)";
			listShadowColor =
				"color-mix(in srgb, var(--color-slate-900), transparent 88%)";
			listDotsColor =
				"radial-gradient(color-mix(in srgb, var(--color-slate-200) 80%, transparent 20%) 1px,transparent 0)";

			listTextColor = "text-slate-400";

			listHoverColor = "hover:bg-slate-100";
			listActiveColor = "active:bg-slate-200";
			listDropdownOpenColor = "group-data-[state='open']/dropdown:bg-slate-100";

			listTitleTextColor = "text-slate-700";
			listTitlePlaceholderTextColor = "placeholder:text-slate-500/50";

			listTitleRingHoverColor = "hover:ring-slate-200";
			listTitleRingFocusColor = "focus:ring-slate-400/50";
			listTitleRingPeerHoverColor = "peer-hover:ring-slate-200";

			listTitleNewTaskTextColor = "text-slate-500";
			listTitleNewTaskHoverColor = "hover:bg-slate-100";
			listTitleNewTaskActiveColor = "active:bg-slate-200";
			break;
		// peach theme
		case "peach":
			listBgColor = "bg-peach-500";
			listBorderColor =
				"color-mix(in srgb, var(--color-peach-950), transparent 75%)";
			listShadowColor =
				"color-mix(in srgb, var(--color-peach-980), transparent 75%)";
			listDotsColor =
				"radial-gradient(color-mix(in srgb, var(--color-peach-600), transparent 20%) 1px,transparent 0)";

			listTextColor = "text-peach-950/70";

			listHoverColor =
				"hover:bg-[color-mix(in_srgb,var(--color-peach-600),white_30%)]";
			listActiveColor =
				"active:bg-[color-mix(in_srgb,var(--color-peach-600),white_15%)]";
			listDropdownOpenColor =
				"group-data-[state='open']/dropdown:bg-[color-mix(in_srgb,var(--color-peach-600),white_30%)]";

			listTitleTextColor = "text-peach-980";
			listTitlePlaceholderTextColor = "placeholder:text-peach-950/50";

			listTitleRingHoverColor = "hover:ring-peach-600/50";
			listTitleRingFocusColor = "focus:ring-peach-700/70";
			listTitleRingPeerHoverColor = "peer-hover:ring-peach-600/50";

			listTitleNewTaskTextColor = "text-peach-950";
			listTitleNewTaskHoverColor =
				"hover:bg-[color-mix(in_srgb,var(--color-peach-600),white_30%)]";
			listTitleNewTaskActiveColor =
				"active:bg-[color-mix(in_srgb,var(--color-peach-600),white_15%)]";
			break;
		// yellow theme
		case "yellow":
			listBgColor = "bg-yellow-50";
			listBorderColor =
				"color-mix(in srgb, var(--color-yellow-800), transparent 75%)";
			listShadowColor =
				"color-mix(in srgb, var(--color-yellow-800), transparent 75%)";
			listDotsColor =
				"radial-gradient(color-mix(in srgb, var(--color-yellow-600), transparent 80%) 1px,transparent 0)";

			listTextColor =
				"text-[color-mix(in_srgb,var(--color-yellow-600),var(--color-yellow-100)_25%)]";

			listHoverColor =
				"hover:bg-[color-mix(in_srgb,var(--color-yellow-50),var(--color-yellow-600)_10%)]";
			listActiveColor =
				"active:bg-[color-mix(in_srgb,var(--color-yellow-50),var(--color-yellow-600)_20%)]";
			listDropdownOpenColor =
				"group-data-[state='open']/dropdown:bg-[color-mix(in_srgb,var(--color-yellow-50),var(--color-yellow-600)_10%)]";

			listTitleTextColor = "text-yellow-700";
			listTitlePlaceholderTextColor = "placeholder:text-yellow-700/50";

			listTitleRingHoverColor = "hover:ring-yellow-600/20";
			listTitleRingFocusColor = "focus:ring-yellow-700/30";
			listTitleRingPeerHoverColor = "peer-hover:ring-yellow-600/20";

			listTitleNewTaskTextColor = "text-yellow-600";
			listTitleNewTaskHoverColor =
				"hover:bg-[color-mix(in_srgb,var(--color-yellow-50),var(--color-yellow-600)_10%)]";
			listTitleNewTaskActiveColor =
				"active:bg-[color-mix(in_srgb,var(--color-yellow-50),var(--color-yellow-600)_20%)]";
			break;
		// blue theme
		case "blue":
			listBgColor = "bg-sky-100";
			listBorderColor =
				"color-mix(in srgb, var(--color-sky-800), transparent 75%)";
			listShadowColor =
				"color-mix(in srgb, var(--color-sky-800), transparent 75%)";
			listDotsColor =
				"radial-gradient(color-mix(in srgb, var(--color-sky-600), transparent 80%) 1px,transparent 0)";

			listTextColor =
				"text-[color-mix(in_srgb,var(--color-sky-600),var(--color-sky-100)_25%)]";

			listHoverColor =
				"hover:bg-[color-mix(in_srgb,var(--color-sky-50),var(--color-sky-600)_15%)]";
			listActiveColor =
				"active:bg-[color-mix(in_srgb,var(--color-sky-50),var(--color-sky-600)_20%)]";
			listDropdownOpenColor =
				"group-data-[state='open']/dropdown:bg-[color-mix(in_srgb,var(--color-sky-50),var(--color-sky-600)_15%)]";

			listTitleTextColor =
				"text-[color-mix(in_srgb,var(--color-sky-600),var(--color-sky-900)_35%)]";
			listTitlePlaceholderTextColor = "placeholder:text-sky-700/50";

			listTitleRingHoverColor = "hover:ring-sky-600/20";
			listTitleRingFocusColor = "focus:ring-sky-700/30";
			listTitleRingPeerHoverColor = "peer-hover:ring-sky-600/20";

			listTitleNewTaskTextColor = "text-sky-600";
			listTitleNewTaskHoverColor =
				"hover:bg-[color-mix(in_srgb,var(--color-sky-50),var(--color-sky-600)_15%)]";
			listTitleNewTaskActiveColor =
				"active:bg-[color-mix(in_srgb,var(--color-sky-50),var(--color-sky-600)_20%)]";
			break;
		// red theme
		case "red":
			listBgColor = "bg-red-200";
			listBorderColor =
				"color-mix(in srgb, var(--color-red-800), transparent 75%)";
			listShadowColor =
				"color-mix(in srgb, var(--color-red-800), transparent 75%)";
			listDotsColor =
				"radial-gradient(color-mix(in srgb, var(--color-red-600), transparent 80%) 1px,transparent 0)";

			listTextColor =
				"text-[color-mix(in_srgb,var(--color-red-600),var(--color-red-100)_25%)]";

			listHoverColor =
				"hover:bg-[color-mix(in_srgb,var(--color-red-200),var(--color-red-600)_15%)]";
			listActiveColor =
				"active:bg-[color-mix(in_srgb,var(--color-red-200),var(--color-red-600)_20%)]";
			listDropdownOpenColor =
				"group-data-[state='open']/dropdown:bg-[color-mix(in_srgb,var(--color-red-200),var(--color-red-600)_15%)]";

			listTitleTextColor =
				"text-[color-mix(in_srgb,var(--color-red-600),var(--color-red-900)_35%)]";
			listTitlePlaceholderTextColor = "placeholder:text-red-700/50";

			listTitleRingHoverColor = "hover:ring-red-600/20";
			listTitleRingFocusColor = "focus:ring-red-700/30";
			listTitleRingPeerHoverColor = "peer-hover:ring-sky-600/20";

			listTitleNewTaskTextColor = "text-red-600";
			listTitleNewTaskHoverColor =
				"hover:bg-[color-mix(in_srgb,var(--color-red-200),var(--color-red-600)_15%)]";
			listTitleNewTaskActiveColor =
				"active:bg-[color-mix(in_srgb,var(--color-red-200),var(--color-red-600)_20%)]";
			break;
	}

	// task list dragging

	const handleMouseDown = (e: React.MouseEvent) => {
		if (!cardParentRef.current) return;
		draggingRef.current = true;

		const rect = cardParentRef.current.getBoundingClientRect();
		offsetRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };

		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mouseup", handleMouseUp);
	};

	const handleMouseMove = (e: MouseEvent) => {
		if (!draggingRef.current || !cardParentRef.current) return;

		const newX = e.clientX - offsetRef.current.x - canvasPosition.current.x;
		const newY = e.clientY - offsetRef.current.y - canvasPosition.current.y;

		positionRef.current = { x: newX, y: newY };
		cardParentRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
	};

	const handleMouseUp = () => {
		if (!cardParentRef.current) return;
		draggingRef.current = false;

		window.removeEventListener("mousemove", handleMouseMove);
		window.removeEventListener("mouseup", handleMouseUp);
	};

	const [nextId, setNextId] = useState(1);

	const newTask = () => {
		setList((prev) => [...prev, { id: String(nextId) }]);
		setNextId(nextId + 1);
	};

	const deleteTask = (taskId: string) => {
		setList((prev) => prev.filter((i) => i.id !== String(taskId)));
	};

	return (
		<>
			<div
				ref={cardParentRef}
				id={id}
				onMouseDown={() => {
					bringToFront(id);
				}}
				style={{ zIndex: zIndex }}
				className="absolute w-70"
			>
				{ready && (
					<>
						<motion.div
							initial={{ scale: 1.1, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 1.1, opacity: 0 }}
						>
							{/* prettier-ignore */}
							<div
								className={`rounded-lg cursor-auto ${listBgColor}`}
								style={{ boxShadow: `0 0 0 1.5px ${listBorderColor}, 0 3px 4px 0 ${listShadowColor}` }}
							>
								<div className="ms-2 me-1.5 mb-2 pt-4">
									<div className="flex w-full gap-4">
										<div className="me-auto min-w-0 w-full">
											<div
												className="
													absolute
													top-0
													inset-x-0
													h-13
													rounded-t-[inherit]
													cursor-grab
													active:cursor-grabbing
													opacity-0
													bg-size-[10px_10px]
													bg-position-[-19px_-19px]
													transition-all ease-linear
													duration-75
													hover:opacity-100
													peer
													z-50
												"
												style={{
													backgroundImage: `${listDotsColor}`
												}}
												onMouseDown={handleMouseDown}
											/>
											<TaskListName placeholder="Task List Name" value={taskListName} className={`${listBgColor} ${listTitleTextColor} ${listTitlePlaceholderTextColor} ${listTitleRingHoverColor} ${listTitleRingFocusColor} ${listTitleRingPeerHoverColor} relative z-20 resize-none text-xl max-w-full py-1 px-3 rounded-sm ring-2 ring-transparent transition-shadow ease-linear font-semibold focus:outline-0`} onChange={(e) => { setTaskListName(e.target.value)}}/>
										</div>
										<div className="ms-auto">
											<DropdownMenuRoot trigger={
												<div className={`${listBgColor} ${listHoverColor} ${listActiveColor} ${listDropdownOpenColor} ${listTitleNewTaskTextColor} relative z-60 cursor-pointer text-lg flex justify-center items-center h-[38px] w-[38px] rounded-md transition-all ease-linear`}>
													<DotsThreeOutlineVerticalIcon weight="fill"/>
												</div>
											}>
												<DropdownMenuContent side="right" align="start" alignOffset={-16} sideOffset={16} initial={{ opacity: 0, translateX: "-4px" }} animate={{ opacity: 1, translateX: 0 }} exit={{ opacity: 0 }}>
														<DropdownMenuItem onClick={() => {deleteTaskList(id)}}>
															<div className="flex items-center text-red-600 gap-2">
																<div className="text-xl">
																	<TrashIcon weight="duotone"/>
																</div>
																<div className="-mt-px">Delete</div>
																<div className="text-xs ms-4 text-slate-500">
																	⌘ + D
																</div>
															</div>
														</DropdownMenuItem>
														<DropdownMenuRoot trigger={
															<>
																<DropdownMenuSubTrigger>
																	<div className="flex items-center gap-2">
																		<div className="text-xl text-slate-500">
																			<PaintBrushIcon weight="duotone"/>
																		</div>
																		<div>Color</div>
																	</div>
																</DropdownMenuSubTrigger>
															</>
														}>
															<DropdownMenuContent side="right" sideOffset={16} align="start" alignOffset={-8}>
																{taskListColors.map(({color, hex}, i) => {
																	return (
																		<>
																			<DropdownMenuItem key={i} onClick={() => {setTaskListColor(color?.toLowerCase())}}>
																				<div className="flex items-center gap-2">
																					<div className="h-3 w-3 border border-black/30 shadow-sm shadow-slate-500/40 rounded-full" style={{ background: hex }}/>
																					<div className="me-6">
																						{color}
																					</div>
																					<div
																						style={{
																							opacity: (listColor === color.toLocaleLowerCase() ? "1" : "0"),
																							boxShadow:
																								"inset 0 0 0 1px rgb(255,255,255,15%), inset 0 0 3px 2px rgb(255,255,255,10%), 0 1px 1px rgb(0,0,0,4%), 0 4px 4px color-mix(in srgb, var(--color-azure-500), transparent 90%)",
																						}}
																						className="bg-linear-to-t ms-auto h-5 w-5 flex justify-center items-center text-white rounded-full border border-black/30 bg-azure-500 to-azure-300 bg-origin-border">
																						<div className="drop-shadow-sm text-xs">
																							<CheckFatIcon weight="fill"/>
																						</div>
																					</div>
																				</div>
																			</DropdownMenuItem>
																		</>
																	)
																})}
															</DropdownMenuContent>
														</DropdownMenuRoot>
												</DropdownMenuContent>
											</DropdownMenuRoot>
										</div>
									</div>
								</div>
								<div className="relative">
									<AnimatePresence>
										{list.length === 0 ? (
											<div className={`${listTextColor} text-center h-35 px-6 flex flex-col justify-center items-center`}>
												<div className="text-4xl mx-auto w-fit">
													<CheckSquareOffsetIcon weight="duotone"/>
												</div>
												<div className="font-semibold">Empty List</div>
												<div className="text-sm">Get started by clicking 'Add New Task' to create your first tasks!</div>
											</div>
										) : (
											<>
												{list.map(item => (
													<motion.div layout key={item.id} transition={{ duration: 0.15 }} initial={{ opacity: 0, translateX: "20px" }} animate={{ opacity: 1, translateX: "0" }} exit={{ opacity: 0, translateX: "20px", pointerEvents: "none" }}>
														<Task taskListColor={listColor} complete={false} deleteTask={deleteTask} name="New Task" id={item.id} />
													</motion.div>
												))}
											</>
										)}
									</AnimatePresence>
								</div>
								<div className="py-2 px-2">
									<button onClick={newTask} className={`${listTitleNewTaskTextColor} ${listTitleNewTaskHoverColor} ${listTitleNewTaskActiveColor} w-full rounded-sm inline-flex justify-center items-center py-0.5 min-h-8 text-sm font-semibold transition-all ease-linear cursor-pointer`}>
										<div className="flex items-center gap-2">
											<div className="text-lg">
												<PlusIcon weight="bold"/>
											</div>
											<div>
												Add New Task
											</div>
										</div>
									</button>
								</div>
							</div>
						</motion.div>
					</>
				)}
			</div>
		</>
	);
};

export default TaskListCard;
