import React, { useState } from 'react';

const Calculator = ({ closeModal }) => {
	const [input, setInput] = useState('');
	
	const handleButtonClick = (value) => {
		setInput((prevInput) => prevInput + value);
	};
	
	const handleCalculate = () => {
		try {
			const validExpression = /^[\d+\-*/().\s]*$/;
			if (validExpression.test(input)) {
				setInput(eval(input).toString());
			} else {
				setInput('Error');
			}
		} catch (e) {
			setInput('Error');
		}
	};
	
	const handleClear = () => {
		setInput('');
	};
	
	return (
		<div className="fixed top-10 right-0 h-full w-[30%] bg-white border-l-2 shadow-lg">
			<div className="p-6">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-lg font-bold">Calculator</h2>
					<button
						onClick={closeModal}
						className="text-gray-500 hover:text-gray-700 text-xl font-bold"
					>
						×
					</button>
				</div>
				
				{/* Left Section - Display */}
				<div className="p-4 text-white w-full flex flex-col justify-end items-center">
					<input
						type="text"
						value={input}
						className="text-right text-xl bg-transparent border w-full rounded p-2 mb-4 text-dark"
						readOnly={true}
					/>
				</div>
				
				{/* Right Section - Buttons */}
				<div className="grid grid-cols-4 gap-4 p-4">
					{/* 7-9 and / buttons */}
					<button onClick={() => handleButtonClick('7')} className="bg-gray-200 hover:bg-gray-300 p-4 rounded">7</button>
					<button onClick={() => handleButtonClick('8')} className="bg-gray-200 hover:bg-gray-300 p-4 rounded">8</button>
					<button onClick={() => handleButtonClick('9')} className="bg-gray-200 hover:bg-gray-300 p-4 rounded">9</button>
					<button onClick={() => handleButtonClick('/')} className="bg-gray-200 hover:bg-gray-300 p-4 rounded">/</button>
					
					{/* 4-6 and * buttons */}
					<button onClick={() => handleButtonClick('4')} className="bg-gray-200 hover:bg-gray-300 p-4 rounded">4</button>
					<button onClick={() => handleButtonClick('5')} className="bg-gray-200 hover:bg-gray-300 p-4 rounded">5</button>
					<button onClick={() => handleButtonClick('6')} className="bg-gray-200 hover:bg-gray-300 p-4 rounded">6</button>
					<button onClick={() => handleButtonClick('*')} className="bg-gray-200 hover:bg-gray-300 p-4 rounded">*</button>
					
					{/* 1-3 and - buttons */}
					<button onClick={() => handleButtonClick('1')} className="bg-gray-200 hover:bg-gray-300 p-4 rounded">1</button>
					<button onClick={() => handleButtonClick('2')} className="bg-gray-200 hover:bg-gray-300 p-4 rounded">2</button>
					<button onClick={() => handleButtonClick('3')} className="bg-gray-200 hover:bg-gray-300 p-4 rounded">3</button>
					<button onClick={() => handleButtonClick('-')} className="bg-gray-200 hover:bg-gray-300 p-4 rounded">-</button>
					
					{/* 0, . and + buttons */}
					<button onClick={() => handleButtonClick('0')} className="bg-gray-200 hover:bg-gray-300 p-4 rounded col-span-2">0</button>
					<button onClick={() => handleButtonClick('.')} className="bg-gray-200 hover:bg-gray-300 p-4 rounded">.</button>
					<button onClick={() => handleButtonClick('+')} className="bg-gray-200 hover:bg-gray-300 p-4 rounded">+</button>
					
					{/* Clear and Calculate buttons */}
					<button onClick={handleClear} className="bg-red-500 hover:bg-red-600 text-white p-4 rounded col-span-2">C</button>
					<button onClick={handleCalculate} className="bg-green-500 hover:bg-green-600 text-white p-4 rounded col-span-2">=</button>
				</div>
			</div>
		</div>
	);
};

export default Calculator;
