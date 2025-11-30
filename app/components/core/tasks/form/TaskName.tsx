import { useLayoutEffect } from "radix-ui/internal";
import { forwardRef, useEffect, useRef, useState } from "react";

interface TaskNameProps {
	placeholder: string;
	onChange: (arg?: any) => void;
	value: string;
	className: string;
	onWidthChange: (value: number) => void;
}

const TaskName = forwardRef<HTMLTextAreaElement, TaskNameProps>(
	({ placeholder, onChange, value, className, onWidthChange }, ref) => {
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

		useEffect(() => {
			if (!textareaMirrorRef.current) return;
			onWidthChange(textareaMirrorRef.current.getBoundingClientRect().width);
		}, [value]);

		return (
			<>
				<div className="relative flex w-full items-center">
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
						className="pointer-events-none absolute inset-x-0 top-0 z-80 min-h-5 w-max max-w-full px-1 py-px ps-1 text-sm leading-[18px] font-semibold wrap-break-word whitespace-pre-wrap text-red-500 opacity-0"
					>
						{value != "" ? <>{value}</> : <>{placeholder}</>}
					</div>
				</div>
			</>
		);
	},
);

export default TaskName;
