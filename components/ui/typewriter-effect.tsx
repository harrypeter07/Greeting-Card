"use client";

import { useEffect, useState } from "react";

interface TypewriterEffectProps {
	words: string[];
	className?: string;
	cursorClassName?: string;
	delay?: number;
}

export function TypewriterEffect({
	words,
	className = "",
	cursorClassName = "",
	delay = 2000,
}: TypewriterEffectProps) {
	const [currentWordIndex, setCurrentWordIndex] = useState(0);
	const [currentText, setCurrentText] = useState("");
	const [isDeleting, setIsDeleting] = useState(false);
	const [typeSpeed, setTypeSpeed] = useState(100);

	useEffect(() => {
		const currentWord = words[currentWordIndex];

		if (isDeleting) {
			setCurrentText(currentWord.substring(0, currentText.length - 1));
			setTypeSpeed(50);
			if (currentText === "") {
				setIsDeleting(false);
				setCurrentWordIndex((prev) => (prev + 1) % words.length);
			}
		} else {
			setCurrentText(currentWord.substring(0, currentText.length + 1));
			setTypeSpeed(100);
			if (currentText === currentWord) {
				setTimeout(() => {
					setIsDeleting(true);
				}, delay);
			}
		}
	}, [currentText, isDeleting, currentWordIndex, words, delay]);

	return (
		<div className={`inline-block ${className}`}>
			{currentText}
			<span
				className={`inline-block w-[2px] h-[1em] bg-current ml-1 animate-pulse ${cursorClassName}`}
			/>
		</div>
	);
}
