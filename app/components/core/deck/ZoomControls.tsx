import { MinusIcon } from "@phosphor-icons/react";
import { PlusIcon } from "@phosphor-icons/react/dist/ssr";
import { useEffect, useRef, useState } from "react";

interface ZoomControlsProps {}

const ZoomControls = ({}: ZoomControlsProps) => {
	const [zoomValue, setZoomValue] = useState("");
	const inputMirrorRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const [readyForMeasurement, setReadyForMeasurement] =
		useState<boolean>(false);

	useEffect(() => {
		if (!inputMirrorRef.current || !inputRef.current) return;

		inputRef.current.style.height = `${inputMirrorRef.current.offsetHeight}px`;
		inputRef.current.style.width = `${inputMirrorRef.current.offsetWidth}px`;

		setReadyForMeasurement(true);
	}, [zoomValue]);

	useEffect(() => {
		if (readyForMeasurement) {
			if (!inputMirrorRef.current || !inputRef.current) return;

			inputRef.current.style.height = `${inputMirrorRef.current.getBoundingClientRect().height}px`;
			inputRef.current.style.width = `${inputMirrorRef.current.getBoundingClientRect().width}px`;
		}
	}, [zoomValue]);

	useEffect(() => {
		setZoomValue("100");
	}, []);
	return (
		<>
			{/* prettier-ignore */}
			<div
			  className="
					flex
					items-center
					border
					border-black/30
					bg-linear-to-t
					from-gray-300/70
					to-gray-50/70
					backdrop-blur-sm
					backdrop-saturate-300
					rounded-[10px]
					bg-origin-border
					px-1
					text-neutral-800
					text-shadow-transparent
				"
				style={{
  							boxShadow: `inset 0 0 0 1px rgb(255,255,255,20%), inset 0 0 3px 2px rgb(255,255,255,10%), 0 1px 1px rgb(0,0,0, 20%), 0 6px 4px rgb(0,0,0,10%)`,
  						}}
			>
				<button className="flex cursor-pointer justify-center items-center text-slate-600 transition-all ease-linear rounded-full text-base h-7 w-7 hover:bg-slate-500/10 active:bg-slate-500/20">
				  <MinusIcon weight="bold"/>
				</button>
				<div className="relative flex flex-col h-7">
  				<input
            ref={inputRef}
  					value={zoomValue}
            type="number"
  					onChange={(e) => {setZoomValue(e.target.value)}}
  					className="appearance-none [-moz-appearance:textfield] [&::-webkit-outer-spin-button,&::-webkit-inner-spin-button]:appearance-none pe-6 grow cursor-pointer rounded-md px-2 font-semibold text-slate-600 outline-0 transition-colors ease-linear hover:bg-slate-500/10 focus:cursor-text focus:hover:bg-transparent active:bg-slate-500/20 focus:active:bg-transparent"
  				/>
          <div className="pointer-events-none absolute end-0 flex justify-center items-center h-7 w-7 font-bold text-slate-500/80">
            %
          </div>
  				<div ref={inputMirrorRef} className="pe-6 h-full opacity-0 pointer-events-none absolute top-0 w-max px-2 font-semibold">
  				  {zoomValue}
  				</div>
				</div>
				<button className="flex cursor-pointer justify-center items-center text-slate-600 transition-all ease-linear rounded-full text-base h-7 w-7 hover:bg-slate-500/10 active:bg-slate-500/20">
				  <PlusIcon weight="bold"/>
				</button>
			</div>
		</>
	);
};

export default ZoomControls;
