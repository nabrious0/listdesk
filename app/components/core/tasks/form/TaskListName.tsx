import { useLayoutEffect } from "radix-ui/internal";
import { useEffect, useRef, useState } from "react";

interface TaskListNameProps {
	placeholder: string;
	onChange: (arg?: any) => void;
	value: string;
	className: string;
}

const TaskListName = ({
	placeholder,
	onChange,
	value,
	className,
}: TaskListNameProps) => {
	const textareaMirrorRef = useRef<HTMLDivElement>(null);
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const [readyForMeasurement, setReadyForMeasurement] =
		useState<boolean>(false);

	useEffect(() => {
		if (!textareaMirrorRef.current || !textareaRef.current) return;

		textareaRef.current.style.height = `${textareaMirrorRef.current.offsetHeight}px`;
		textareaRef.current.style.width = `${textareaMirrorRef.current.offsetWidth}px`;

		setReadyForMeasurement(true);
	}, []);

	useEffect(() => {
		if (readyForMeasurement) {
			if (!textareaMirrorRef.current || !textareaRef.current) return;

			textareaRef.current.style.height = `${textareaMirrorRef.current.getBoundingClientRect().height}px`;
			textareaRef.current.style.width = `${textareaMirrorRef.current.getBoundingClientRect().width}px`;
		}
	}, [value]);

	return (
		<>
			<div className="relative w-full">
				<textarea
					className={className}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					ref={textareaRef}
					style={{
						zIndex: 60,
					}}
				/>
				<div
					ref={textareaMirrorRef}
					className="pointer-events-none absolute top-0 z-50 w-max max-w-full px-3 py-1 text-xl font-semibold whitespace-pre-wrap text-red-500 opacity-0"
				>
					{value != "" ? <>{value}</> : <>{placeholder}</>}
				</div>
			</div>
		</>
	);
};

export default TaskListName;
