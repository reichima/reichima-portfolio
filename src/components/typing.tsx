import React, { useEffect, useState } from "react";

interface TypingProps {
	children: React.ReactNode;
	speed?: number;
	delay?: number;
	className?: string;
}

const Typing: React.FC<TypingProps> = ({
	children,
	speed = 100,
	delay = 0,
	className,
}) => {
	const [displayedText, setDisplayedText] = useState<string>("");
	const [isDelayed, setIsDelayed] = useState<boolean>(true);

	const fixedText =
		typeof children === "string"
			? children
			: React.Children.toArray(children).join("");

	useEffect(() => {
		const delayTimeout = setTimeout(() => {
			setIsDelayed(false);
		}, delay * 1000);

		return () => clearTimeout(delayTimeout);
	}, [delay]);

	// Typing effect
	useEffect(() => {
		if (isDelayed) return;

		if (displayedText.length < fixedText.length) {
			const typingTimeout = setTimeout(() => {
				setDisplayedText((prev) => prev + fixedText[displayedText.length]);
			}, speed);

			return () => clearTimeout(typingTimeout);
		}
	}, [fixedText, displayedText, isDelayed, speed]);

	return (
		<div className="flex">
			<pre className={className}>{displayedText}</pre>
			<div className="ml-1.5 my-auto relative w-2 h-4 bg-zinc-50 animate-pulse" />
		</div>
	);
};

export default Typing;
