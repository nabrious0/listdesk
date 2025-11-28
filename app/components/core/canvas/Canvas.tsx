import { AnimatePresence } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import Deck from "~/components/core/deck/Deck";
import TaskListCard from "~/components/core/tasks/TaskListCard";

interface canvasProps {}

const Canvas = ({}: canvasProps) => {
	// canvas logic
	const canvasRef = useRef<HTMLDivElement>(null);
	const canvasHeight: number = 20000;
	const canvasWidth: number = 20000;

	const wrapperRef = useRef<HTMLDivElement>(null);
	const [wrapperHeight, setWrapperHeight] = useState<number>(0);
	const [wrapperWidth, setWrapperWidth] = useState<number>(0);

	useEffect(() => {
		const initialX = (wrapperHeight - canvasHeight) / 2;
		const initialY = (wrapperHeight - canvasHeight) / 2;

		position.current = { x: initialX, y: initialY };
	}, []);

	useEffect(() => {
		if (!wrapperRef.current) return;

		setWrapperHeight(wrapperRef.current.offsetHeight);
		setWrapperWidth(wrapperRef.current.offsetWidth);
	}, []);

	const position = useRef<{ x: number; y: number }>({
		x: 0,
		y: 0,
	});
	const mouseStartPosition = useRef<{
		x: number;
		y: number;
	}>({ x: 0, y: 0 });
	const canvasStartPosition = useRef<{
		x: number;
		y: number;
	}>({
		x: 0,
		y: 0,
	});

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!canvasRef.current) return;

		if (e.target === canvasRef.current) {
			mouseStartPosition.current = { x: e.clientX, y: e.clientY };
			canvasStartPosition.current = {
				x: position.current.x,
				y: position.current.y,
			};

			window.addEventListener("mousemove", handleMouseMove);
			window.addEventListener("mouseup", handleMouseUp);
		}
	};

	const clampCanvas = (value: number, min: number, max: number) => {
		return Math.min(Math.max(value, min), max);
	};

	const minX = wrapperWidth - canvasWidth;
	const maxX = 0;

	const minY = wrapperHeight - canvasHeight;
	const maxY = 0;

	const handleMouseMove = (e: MouseEvent) => {
		const dx: number = e.clientX - mouseStartPosition.current.x;
		const dy: number = e.clientY - mouseStartPosition.current.y;

		const rawX: number = canvasStartPosition.current.x + dx;
		const rawY: number = canvasStartPosition.current.y + dy;

		const clampedX = clampCanvas(rawX, minX, maxX);
		const clampedY = clampCanvas(rawY, minY, maxY);

		position.current = {
			x: clampedX,
			y: clampedY,
		};

		if (canvasRef.current) {
			canvasRef.current.style.transform = `translate(${clampedX}px, ${clampedY}px)`;
		}
	};

	const handleMouseUp = () => {
		window.removeEventListener("mousemove", handleMouseMove);
		window.removeEventListener("mouseup", handleMouseUp);
	};

	// create new task list logic

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
			{/* prettier-ignore */}
			<div ref={wrapperRef} className="h-full w-full">
				<div
					ref={canvasRef}
					className="
						fixed
						min-h-full
						cursor-grab
						bg-slate-100
						bg-[radial-gradient(var(--color-slate-300)_1px,transparent_0)]
						bg-size-[40px_40px]
						bg-position-[-19px_-19px]
						active:cursor-grabbing
					"
					style={{
						boxShadow:
							"inset 0 0 1000000px color-mix(in srgb, var(--color-slate-600), transparent 80%)",
						height: canvasHeight,
						width: canvasWidth,
						transform: `translateX(${position.current.x}px) translateY(${position.current.y}px)`,
					}}
					onMouseDown={handleMouseDown}
				>
					<AnimatePresence>
						{list.map((item) => (
							<TaskListCard
								key={item.id}
								id={item.id}
								zIndex={zIndices[item.id] || 0}
								bringToFront={bringToFront}
								deleteTaskList={deleteTaskList}
								wrapperHeight={wrapperHeight}
								wrapperWidth={wrapperWidth}
								canvasPosition={position}
							/>
						))}
					</AnimatePresence>
				</div>
				<Deck newList={newList}/>
			</div>
		</>
	);
};

export default Canvas;
