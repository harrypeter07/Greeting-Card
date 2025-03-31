"use client";

import { useEffect, useState } from "react";

interface TypewriterEffectProps {
	words: {
		text: string;
	}[];
}

export function TypewriterEffect({ words }: TypewriterEffectProps) {
	const [currentWordIndex, setCurrentWordIndex] = useState(0);
	const [currentText, setCurrentText] = useState("");
	const [isDeleting, setIsDeleting] = useState(false);
	const [delay, setDelay] = useState(2000);

	useEffect(() => {
		const currentWord = words[currentWordIndex].text;

		if (isDeleting) {
			setCurrentText(currentWord.substring(0, currentText.length - 1));
			setDelay(100);
		} else {
			setCurrentText(currentWord.substring(0, currentText.length + 1));
			setDelay(200);
		}

		const timeout = setTimeout(() => {
			if (isDeleting) {
				if (currentText === "") {
					setIsDeleting(false);
					setCurrentWordIndex((prev) => (prev + 1) % words.length);
				}
			} else {
				if (currentText === currentWord) {
					setIsDeleting(true);
				}
			}
		}, delay);

		return () => clearTimeout(timeout);
	}, [currentText, currentWordIndex, isDeleting, words, delay]);

	return (
		<span className="inline-block">
			{currentText}
			<span className="animate-pulse">|</span>
		</span>
	);
}
