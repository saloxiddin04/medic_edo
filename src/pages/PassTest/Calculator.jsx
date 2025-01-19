import React, {useState} from 'react';

const Calculator = ({ closeModal }) => {
	const [input, setInput] = useState('');
	const [position, setPosition] = useState({ x: 0, y: 0 });
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
	
	// const handleMouseDown = (e) => {
	// 	setDragging(true);
	// 	setOffset({
	// 		x: e.clientX - position.x,
	// 		y: e.clientY - position.y,
	// 	});
	// };
	
	// const handleMouseMove = (e) => {
	// 	if (dragging) {
	// 		setPosition({
	// 			x: e.clientX - offset.x,
	// 			y: e.clientY - offset.y,
	// 		});
	// 	}
	// };
	//
	// const handleMouseUp = () => {
	// 	setDragging(false);
	// };
	
	const handleStart = (e) => {
		const clientX = e.touches ? e.touches[0].clientX : e.clientX;
		const clientY = e.touches ? e.touches[0].clientY : e.clientY;
		
		setDragging(true);
		setOffset({
			x: clientX - position.x,
			y: clientY - position.y,
		});
		
		document.addEventListener(e.touches ? 'touchmove' : 'mousemove', handleMove);
		document.addEventListener(e.touches ? 'touchend' : 'mouseup', handleEnd);
	};
	
	const handleMove = (e) => {
		if (dragging) {
			const clientX = e.touches ? e.touches[0].clientX : e.clientX;
			const clientY = e.touches ? e.touches[0].clientY : e.clientY;
			
			setPosition({
				x: clientX - offset.x,
				y: clientY - offset.y,
			});
		}
	};
	
	const handleEnd = (e) => {
		setDragging(false);
		document.removeEventListener(e.touches ? 'touchmove' : 'mousemove', handleMove);
		document.removeEventListener(e.touches ? 'touchend' : 'mouseup', handleEnd);
	};
	
	const handleMouseDown = (e) => {
		setDragging(true);
		setOffset({
			x: e.clientX - position.x,
			y: e.clientY - position.y,
		});
		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
	};
	
	const handleMouseMove = (e) => {
		if (dragging) {
			setPosition({
				x: e.clientX - offset.x,
				y: e.clientY - offset.y,
			});
		}
	};
	
	// Mouse up
	const handleMouseUp = () => {
		setDragging(false);
		document.removeEventListener('mousemove', handleMouseMove);
		document.removeEventListener('mouseup', handleMouseUp);
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
			onTouchStart={handleStart}
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
