import {
	CheckFatIcon,
	CheckIcon,
	DotsThreeCircleIcon,
	DotsThreeOutlineIcon,
	DotsThreeOutlineVerticalIcon,
	TrashIcon,
} from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuRoot,
} from "~/components/dropdown/DropdownMenu";

interface TaskProps {
	complete: boolean;
	name: string;
	id: string;
	taskListColor: string;
	deleteTask: (id: string) => void;
}

const Task = ({ complete, name, id, deleteTask, taskListColor }: TaskProps) => {
	const [isComplete, setIsComplete] = useState(false);
	const [text, setText] = useState(String(name));
	const [lineTops, setLineTops] = useState<number[]>([]);
	const mirrorRef = useRef<HTMLDivElement>(null);
	const taskTextareaRef = useRef<HTMLTextAreaElement>(null);
	const [strikeWidth, setStrikeWidth] = useState<number>();

	// update task list color scheme on task list theme change

	const [taskListColorScheme, setTaskListColorScheme] = useState("");

	useEffect(() => {
		setTaskListColorScheme(taskListColor);
	}, [taskListColor]);

	// task theme colors

	let taskIncompleteColor: string = "";
	let taskIncompleteCheckboxBorderColor: string = "";
	let taskIncompleteHoverCheckboxBorderColor: string = "";

	let taskMenuTextColor: string = "";
	let taskMenuActiveColor: string = "";
	let taskMenuHoverColor: string = "";
	let taskMenuOpenColor: string = "";

	let taskNamePlaceholderColor: string = "";
	let taskNameRingHoverColor: string = "";
	let taskNameRingFocusColor: string = "";

	let taskCompleteColor: string = "";
	let taskCompleteCrossGradient: string = "";
	let taskCompleteTextShadow: string = "";
	let taskCompleteCheckboxGradient: string = "";
	let taskCompleteCheckboxShadowColor: string = "";
	let taskCompleteCheckmarkShadowColor: string = "";

	// theme task

	switch (taskListColor) {
		case "white":
			taskIncompleteColor = "text-slate-500";
			taskIncompleteCheckboxBorderColor = "border-slate-500/50";
			taskIncompleteHoverCheckboxBorderColor = "hover:border-slate-500/70";

			taskMenuTextColor = "text-slate-500";
			taskMenuHoverColor = "group-hover/menu:bg-slate-500/10";
			taskMenuActiveColor = "group-active/menu:bg-slate-500/15";
			taskMenuOpenColor = "group-data-[state='open']/dropdown:bg-slate-500/10";

			taskNamePlaceholderColor = "placeholder:text-slate-500/50";
			taskNameRingHoverColor = "hover:ring-slate-400/20";
			taskNameRingFocusColor = "focus:ring-slate-400/50";

			taskCompleteColor = "text-azure-500";
			taskCompleteCrossGradient = "from-azure-800 to-azure-400";
			taskCompleteTextShadow = "text-shadow-azure-800/5";
			taskCompleteCheckboxGradient = "from-azure-600 to-azure-300";
			taskCompleteCheckboxShadowColor = "var(--color-azure-500)";
			taskCompleteCheckmarkShadowColor = "drop-shadow-azure-700/80";
			break;
		case "peach":
			taskIncompleteColor = "text-peach-950";
			taskIncompleteCheckboxBorderColor = "border-peach-950/50";
			taskIncompleteHoverCheckboxBorderColor = "hover:border-peach-950/70";

			taskMenuTextColor = "text-peach-950";
			taskMenuHoverColor =
				"group-hover/menu:bg-[color-mix(in_srgb,var(--color-peach-600),white_30%)]";
			taskMenuActiveColor =
				"group-active/menu:bg-[color-mix(in_srgb,var(--color-peach-600),white_15%)]";
			taskMenuOpenColor =
				"group-data-[state='open']/dropdown:bg-[color-mix(in_srgb,var(--color-peach-600),white_30%)]";

			taskNamePlaceholderColor = "placeholder:text-peach-950/50";
			taskNameRingHoverColor = "hover:ring-peach-600/50";
			taskNameRingFocusColor = "focus:ring-peach-700/70";

			taskCompleteColor = "text-peach-980";
			taskCompleteCrossGradient =
				"from-[color-mix(in_srgb,var(--color-peach-950),black_45%)] to-peach-900";
			taskCompleteTextShadow = "text-shadow-peach-950/5";
			taskCompleteCheckboxGradient = "from-peach-950 to-peach-700";
			taskCompleteCheckboxShadowColor = "var(--color-peach-950)";
			taskCompleteCheckmarkShadowColor = "drop-shadow-peach-980";
			break;
		case "yellow":
			taskIncompleteColor = "text-yellow-600";
			taskIncompleteCheckboxBorderColor = "border-yellow-700/50";
			taskIncompleteHoverCheckboxBorderColor = "hover:border-yellow-700/70";

			taskMenuTextColor = "text-yellow-600";
			taskMenuHoverColor =
				"group-hover/menu:bg-[color-mix(in_srgb,var(--color-yellow-50),var(--color-yellow-600)_10%)]";
			taskMenuActiveColor =
				"group-active/menu:bg-[color-mix(in_srgb,var(--color-yellow-50),var(--color-yellow-600)_20%)]";
			taskMenuOpenColor =
				"group-data-[state='open']/dropdown:bg-[color-mix(in_srgb,var(--color-yellow-50),var(--color-yellow-600)_10%)]";

			taskNamePlaceholderColor = "placeholder:text-yellow-700/50";
			taskNameRingHoverColor = "hover:ring-yellow-600/20";
			taskNameRingFocusColor = "focus:ring-yellow-700/30";

			taskCompleteColor = "text-yellow-700";
			taskCompleteCrossGradient =
				"from-yellow-900 to-[color-mix(in_srgb,var(--color-yellow-600),white_10%)]";
			taskCompleteTextShadow = "text-shadow-yellow-950/5";
			taskCompleteCheckboxGradient =
				"from-[color-mix(in_srgb,var(--color-yellow-600),var(--color-yellow-300)_5%)] to-[color-mix(in_srgb,var(--color-yellow-600),var(--color-yellow-100)_70%)]";
			taskCompleteCheckboxShadowColor = "var(--color-yellow-900)";
			taskCompleteCheckmarkShadowColor = "drop-shadow-yellow-900";
			break;
		case "blue":
			taskIncompleteColor = "text-sky-600";
			taskIncompleteCheckboxBorderColor = "border-sky-700/50";
			taskIncompleteHoverCheckboxBorderColor = "hover:border-sky-700/70";

			taskMenuTextColor = "text-sky-600";
			taskMenuHoverColor =
				"group-hover/menu:bg-[color-mix(in_srgb,var(--color-sky-50),var(--color-sky-600)_15%)]";
			taskMenuActiveColor =
				"group-active/menu:bg-[color-mix(in_srgb,var(--color-sky-50),var(--color-sky-600)_20%)]";
			taskMenuOpenColor =
				"group-data-[state='open']/dropdown:bg-[color-mix(in_srgb,var(--color-sky-50),var(--color-sky-600)_15%)]";

			taskNamePlaceholderColor = "placeholder:text-sky-700/50";
			taskNameRingHoverColor = "hover:ring-sky-600/20";
			taskNameRingFocusColor = "focus:ring-sky-700/30";

			taskCompleteColor = "text-sky-700";
			taskCompleteCrossGradient =
				"from-sky-900 to-[color-mix(in_srgb,var(--color-sky-600),white_10%)]";
			taskCompleteTextShadow = "text-shadow-peach-950/5";
			taskCompleteCheckboxGradient =
				"from-[color-mix(in_srgb,var(--color-sky-600),var(--color-sky-300)_5%)] to-[color-mix(in_srgb,var(--color-sky-600),var(--color-sky-100)_70%)]";
			taskCompleteCheckboxShadowColor = "var(--color-sky-900)";
			taskCompleteCheckmarkShadowColor = "drop-shadow-sky-900";
			break;
		case "red":
			taskIncompleteColor = "text-red-600";
			taskIncompleteCheckboxBorderColor = "border-red-700/50";
			taskIncompleteHoverCheckboxBorderColor = "hover:border-red-700/70";

			taskMenuTextColor = "text-red-600";
			taskMenuHoverColor =
				"group-hover/menu:bg-[color-mix(in_srgb,var(--color-red-200),var(--color-red-600)_15%)]";
			taskMenuActiveColor =
				"group-active/menu:bg-[color-mix(in_srgb,var(--color-red-200),var(--color-red-600)_20%)]";
			taskMenuOpenColor =
				"group-data-[state='open']/dropdown:bg-[color-mix(in_srgb,var(--color-red-200),var(--color-red-600)_15%)]";

			taskNamePlaceholderColor = "placeholder:text-red-700/50";
			taskNameRingHoverColor = "hover:ring-red-600/20";
			taskNameRingFocusColor = "focus:ring-red-700/30";

			taskCompleteColor = "text-red-700";
			taskCompleteCrossGradient =
				"from-red-900 to-[color-mix(in_srgb,var(--color-red-600),white_10%)]";
			taskCompleteTextShadow = "text-shadow-peach-950/5";
			taskCompleteCheckboxGradient =
				"from-red-700 to-[color-mix(in_srgb,var(--color-red-600),var(--color-red-100)_50%)]";
			taskCompleteCheckboxShadowColor = "var(--color-red-900)";
			taskCompleteCheckmarkShadowColor = "drop-shadow-red-900";
			break;
	}

	// handle task cross line

	useEffect(() => {
		if (!mirrorRef.current) return;

		const spans = mirrorRef.current.querySelectorAll("span");
		const tops: number[] = [];
		let lastTop: number | null = null;

		spans.forEach((span) => {
			const top = span.offsetTop + 8;
			if (top !== lastTop) {
				tops.push(top);
				lastTop = top;
			}
		});

		setLineTops(tops);
	}, [text]);

	useEffect(() => {
		if (!taskTextareaRef.current) return;

		setStrikeWidth(taskTextareaRef.current.offsetWidth);
	}, [text]);

	// keep task menu visible if its menu is open

	const [taskDropdownOpen, setTaskDropdownOpen] = useState(false);

	const handleTaskDropdownData = (data: boolean) => {
		setTaskDropdownOpen(data);
	};

	// task state

	return (
		<>
			<div
				className="group/task flex items-center gap-2 ps-3 pe-2.5"
				id={String(id)}
			>
				{/* prettier-ignore */}
				{isComplete ? (
					<>
						<motion.button
							onClick={() => {
								setIsComplete(false);
							}}
							key={"uncompleteTaskButton"}
							className="group/check flex h-[32px] w-[32px] cursor-pointer items-center justify-center"
						>
							<motion.div
								style={{
									boxShadow: `inset 0 0 0 1px rgb(255,255,255,15%), inset 0 0 3px 2px rgb(255,255,255,10%), 0 1px 1px rgb(0,0,0,4%), 0 4px 4px color-mix(in srgb, ${taskCompleteCheckboxShadowColor}, transparent 90%)`,
								}}
								className={`${taskCompleteCheckboxGradient} flex h-[22px] w-[22px] shrink-0 cursor-pointer items-center justify-center rounded-md border border-black/30 bg-linear-to-t bg-origin-border transition-all ease-linear group-active/check:scale-[0.9]`}
							>
								<motion.div
									initial={{ rotate: "75deg", scale: 0 }}
									animate={{ rotate: 0, scale: 1 }}
									exit={{ rotate: "75deg", scale: 0 }}
									className={`${taskCompleteCheckmarkShadowColor} pointer-events-none text-xs text-white drop-shadow-sm`}
								>
									<CheckFatIcon weight="fill" />
								</motion.div>
							</motion.div>
						</motion.button>
					</>
				) : (
					<>
						<motion.button
							onClick={() => {
								setIsComplete(true);
							}}
							className="group/check flex h-[32px] w-[32px] cursor-pointer items-center justify-center"
						>
							<motion.div
								key={"completeTaskButton"}
								className={`h-[22px] w-[22px] shrink-0 cursor-pointer rounded-md border-2 ${taskIncompleteCheckboxBorderColor} transition-all ease-linear group-active/check:scale-[0.9] ${taskIncompleteHoverCheckboxBorderColor}`}
							/>
						</motion.button>
					</>
				)}
				<div className="relative w-full min-w-0 font-semibold">
					<div className="relative flex">
						<textarea
							ref={taskTextareaRef}
							value={text}
							onChange={(e) => {
								setText(e.target.value);
							}}
							placeholder="Task Name"
							className={`${isComplete ? `${taskCompleteColor} ${taskCompleteTextShadow} text-shadow-sm` : `${taskIncompleteColor}`} field-sizing-content min-h-[20px] max-w-full resize-none rounded-sm px-1 py-px text-sm leading-[18px] wrap-break-word ring-2 ring-transparent transition-all ease-linear focus:outline-0 ${taskNamePlaceholderColor} ${taskNameRingHoverColor} ${taskNameRingFocusColor}`}
						/>
						<AnimatePresence>
							{isComplete && (
								<>
									{lineTops.map((top, i) => (
										<motion.div
											key={i}
											initial={{ width: 0 }}
											animate={{ width: strikeWidth }}
											exit={{ width: 0 }}
											className={`${taskCompleteCrossGradient} pointer-events-none absolute inset-x-0 start-0 h-0.5 rounded-full bg-linear-to-r`}
											style={{ top }}
										/>
									))}
								</>
							)}
						</AnimatePresence>
					</div>
					<div
						className="pointer-events-none absolute top-0 min-h-[20px] w-full px-1 py-px text-sm leading-[18px] wrap-break-word whitespace-pre-wrap opacity-0"
						ref={mirrorRef}
					>
						{text.split("").map((char, i) => (
							<span key={i}>{char || "\u200b"}</span>
						))}
					</div>
				</div>
				<div
					className={`h-[32px] w-[32px] shrink-0 ${taskDropdownOpen ? `opacity-100` : `opacity-0 group-hover/task:opacity-100`}`}
				>
					<DropdownMenuRoot
						trigger={
							<div className="group/menu -me-2 flex h-[32px] w-[32px] cursor-pointer items-center justify-center">
								<div
									className={`flex h-[22px] w-[22px] items-center justify-center rounded-sm transition-all ease-linear ${taskMenuTextColor} ${taskMenuHoverColor} ${taskMenuActiveColor} ${taskMenuOpenColor}`}
								>
									<DotsThreeOutlineVerticalIcon weight="fill" />
								</div>
							</div>
						}
						exposeOpen={handleTaskDropdownData}
					>
						<DropdownMenuContent
							side="right"
							sideOffset={16}
							initial={{ opacity: 0, translateX: "0" }}
							animate={{ opacity: 1, translateX: "4px" }}
							exit={{ opacity: 0 }}
						>
							<DropdownMenuItem
								onClick={() => {
									deleteTask(id);
								}}
							>
								<div className="flex items-center gap-2 text-sm text-red-600">
									<div className="text-lg">
										<TrashIcon weight="duotone" />
									</div>
									<div className="-mt-px">Delete</div>
									<div className="ms-4 text-xs text-slate-500">⌘ + D</div>
								</div>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenuRoot>
				</div>
			</div>
		</>
	);
};

export default Task;
