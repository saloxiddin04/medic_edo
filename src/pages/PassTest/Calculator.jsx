import React, { useState } from 'react';

const Calculator = ({ closeModal }) => {
	const [input, setInput] = useState('');
	const [position, setPosition] = useState({ x: 1000, y: 400 });
	const [dragging, setDragging] = useState(false);
	const [offset, setOffset] = useState({ x: 0, y: 0 });
	
	const handleButtonClick = (value) => {
		if (value === "C") {
			setInput("");
		} else if (value === "=") {
			try {
				setInput(eval(input).toString());
			} catch {
				setInput("Error");
			}
		} else {
			setInput(input + value);
		}
	};
	
	const handleMouseDown = (e) => {
		setDragging(true);
		setOffset({
			x: e.clientX - position.x,
			y: e.clientY - position.y,
		});
	};
	
	const handleMouseMove = (e) => {
		if (dragging) {
			setPosition({
				x: e.clientX - offset.x,
				y: e.clientY - offset.y,
			});
		}
	};
	
	const handleMouseUp = () => {
		setDragging(false);
	};
	
	const buttons = [
		["M+", "MR", "MC", "C"],
		["±", "√", "1/x", "/"],
		["7", "8", "9", "×"],
		["4", "5", "6", "-"],
		["1", "2", "3", "+"],
		["0", ".", "="],
	];
	
	
	return (
		<div
			className="absolute bg-blue-100 shadow-lg p-4 rounded-lg w-64 cursor-grab z-50"
			style={{top: `${position.y}px`, left: `${position.x}px`}}
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
			onMouseLeave={handleMouseUp}
		>
			<div className="flex justify-between bg-blue-500 rounded mb-4 p-2">
				<div className="font-bold text-white">
					Calculator
				</div>
				<button
					onClick={closeModal}
					className="bg-red-500 text-white rounded-full w-6 h-6 text-center"
				>
					×
				</button>
			</div>
			<div
				className="mb-4 text-right bg-white p-2 rounded-md shadow-inner text-lg"
			>
				{input || "0"}
			</div>
			<div className="grid grid-cols-4 gap-2">
			{buttons.flat().map((btn, index) => (
					<button
						key={index}
						onClick={() => handleButtonClick(btn.replace("×", "*").replace("÷", "/"))}
						className={`bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition ${
							btn === "=" ? "col-span-2" : ""
						}`}
					>
						{btn}
					</button>
				))}
			</div>
		</div>
	);
};

export default Calculator;
