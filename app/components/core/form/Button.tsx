import type { ReactNode } from "react";
import { motion } from "motion/react";

interface ButtonProps {
	children?: ReactNode;
	color: "azure" | "neutral";
	onClick?: () => void;
}

const buttonClasses =
	"cursor-pointer inline-flex justify-center items-center min-h-[36px] py-1 rounded-[10px] px-4 bg-origin-border text-shadow-sm";
let buttonColorClasses: string;
let buttonShadowStyles: string;

const Button = ({ children, color, onClick }: ButtonProps) => {
	switch (color) {
		case "azure":
			buttonColorClasses =
				"bg-linear-to-t from-azure-600 to-azure-300 text-white text-shadow-azure-700/80 border-1 border-black/30";
			buttonShadowStyles =
				"0 1px 1px rgb(0,0,0,40%), 0 6px 4px color-mix(in srgb, var(--color-azure-500), transparent 90%)";
			break;
		case "neutral":
			buttonColorClasses =
				"bg-linear-to-t from-gray-300 to-gray-50 text-neutral-800 border-1 border-black/30 text-shadow-transparent";
			buttonShadowStyles = "0 1px 1px rgb(0,0,0,40%), 0 6px 4px rgb(0,0,0,10%)";
			break;
	}

	return (
		<>
			<motion.button
				className={`${buttonClasses} ${buttonColorClasses}`}
				whileHover={{ scale: 1.06 }}
				whileTap={{ scale: 0.98 }}
				transition={{ type: "spring", bounce: 0.5 }}
				onClick={onClick}
				style={{
					boxShadow: `inset 0 0 0 1px rgb(255,255,255,20%), inset 0 0 3px 2px rgb(255,255,255,10%), ${buttonShadowStyles}`,
				}}
			>
				{children}
			</motion.button>
		</>
	);
};

export default Button;
