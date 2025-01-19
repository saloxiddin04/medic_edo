import React, {useState} from 'react';

const LabValues = ({closeModal}) => {
	const [activeTab, setActiveTab] = useState('serum');
	const [check, setCheck] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	
	const tabs = [
		{id: 'serum', label: 'Serum'},
		{id: 'cerebrospinal', label: 'Cerebrospinal'},
		{id: 'blood', label: 'Blood'},
		{id: 'urineBmi', label: 'Urine and BMI'},
	];
	
	const tabContent = {
		serum: [
			{parameter: 'Alanine aminotransferase (ALT)', range: '10-40 U/L', si: '10-40 U/L'},
			{parameter: 'Aspartate aminotransferase (AST)', range: '12-38 U/L', si: '12-38 U/L'},
			{parameter: 'Alkaline phosphatase', range: '25-100 U/L', si: '25-100 U/L'},
			{parameter: "Amylase", range: "25-125 U/L", si: "25-125 U/L"},
			{parameter: "Bilirubin", range: "", si: ""},
			{parameter: "Total", range: "0.1-1.0 mg/dL", si: "2-17 μmol/L"},
			{parameter: "Direct", range: "0.0-0.3 mg/dL", si: "0-5 μmol/L"},
			{parameter: "Calcium", range: "8.4-10.2 mg/dL", si: "2.1-2.6 mmol/L"},
			{parameter: "Cholesterol", range: "", si: ""},
			{parameter: "Total", range: "", si: ""},
			{parameter: "Normal", range: "<200 mg/dL", si: "<5.2 mmol/L"},
			{parameter: "High", range: ">240 mg/dL", si: ">6.2 mmol/L"},
			{parameter: "HDL", range: "40-60 mg/dL", si: "1.0-1.6 mmol/L"},
			{parameter: "LDL", range: "<160 mg/dL", si: "<4.2 mmol/L"},
			{parameter: "Triglycerides", range: "", si: ""},
			{parameter: "Normal", range: "<150 mg/dL", si: "<1.70 mmol/L"},
			{parameter: "Borderline", range: "151-199 mg/dL", si: "1.71-2.25 mmol/L"},
			{parameter: "Cortisol", range: "", si: ""},
			{parameter: "0800 h", range: "5-23 μg/dL", si: "138-635 nmol/L"},
			{parameter: "1600 h", range: "3-15 μg/dL", si: "82-413 nmol/L"},
			{parameter: "2000 h", range: "<50% of 0800 h", si: "Fraction of 0800 h: <0.50"},
			{parameter: "Creatine kinase", range: "", si: ""},
			{parameter: "Male", range: "25-90 U/L", si: "25-90 U/L"},
			{parameter: "Female", range: "10-70 U/L", si: "10-70 U/L"},
			{parameter: "Creatinine", range: "0.6-1.2 mg/dL", si: "53-106 μmol/L"},
			{parameter: "Urea nitrogen", range: "7-18 mg/dL", si: "1.2-3.0 mmol/L"},
			{parameter: "Electrolytes, serum", range: "", si: ""},
			{parameter: "Sodium (Na⁺)", range: "136-146 mEq/L", si: "136-146 mmol/L"},
			{parameter: "Potassium (K⁺)", range: "3.5-5.0 mEq/L", si: "3.5-5.0 mmol/L"},
			{parameter: "Chloride (Cl⁻)", range: "95-105 mEq/L", si: "95-105 mmol/L"},
			{parameter: "Bicarbonate (HCO₃⁻) ", range: "22-28 mEq/L", si: "22-28 mmol/L"},
			{parameter: "Magnesium (Mg²⁺)", range: "1.5-2.0 mEq/L", si: "0.75-1.0 mmol/L"},
			{parameter: "Ferritin", range: "", si: ""},
			{parameter: "Male", range: "20-250 ng/mL", si: "20-250 μg/L"},
			{parameter: "Female", range: "10-120 ng/mL", si: "10-120 μg/L"},
			{parameter: "Follicle-stimulating hormone", range: "", si: ""},
			{parameter: "Male", range: "4-25 mlU/ml", si: "4-25 U/L"},
			{parameter: "Female", range: "", si: ""},
			{parameter: "premenopause", range: "4-30 mlU/ml", si: "4-30 U/L"},
			{parameter: "midcycle peak", range: "10-90 mlU/ml", si: "10-90 U/L"},
			{parameter: "postmenopause", range: "40-250 mlU/ml", si: "40-250 U/L"},
			{parameter: "Glucose", range: "", si: ""},
			{parameter: "Fasting", range: "70-110 mg/dL", si: "3.8-5.6 mmol/L"},
			{parameter: "Random, non-fasting", range: "<140 mg/dL", si: "<7.7 mmol/L"},
			{parameter: "Growth hormone- arginine stimulation", range: "", si: ""},
			{parameter: "Fasting", range: "<5 ng/mL", si: "<5 μg/L"},
			{parameter: "Provocative stimuli", range: ">7 ng/mL", si: ">7 μg/L"},
			{parameter: "Iron", range: "", si: ""},
			{parameter: "Male", range: "65-175 μg/dL", si: "11.6-31.3 μmol/L"},
			{parameter: "Female", range: "50-170 μg/dL", si: "9.0-30.4 μmol/L"},
			{parameter: "Total iron-binding capacity", range: "250-450 μg/dL", si: "44.8-71.6 μmol/L"},
			{parameter: "Transferrin", range: "200-360 mg/dL", si: "2.0-3.6 g/L"},
			{parameter: "Lactate dehydrogenase", range: "45-200 U/L", si: "45-200 U/L"},
			{parameter: "Luteinizing hormone", range: "", si: ""},
			{parameter: "Male", range: "6-23 mlU/ml", si: "6-23 U/L"},
			{parameter: "Female", range: "", si: ""},
			{parameter: "follicular phase", range: "5-30 mlU/ml", si: "5-30 U/L"},
			{parameter: "midcycle", range: "75-150 mlU/ml", si: "75-150 U/L"},
			{parameter: "postmenopause", range: "30-200 mlU/ml", si: "30-200 U/L"},
			{parameter: "Osmolality", range: "275-295 mOsmol/kg H₂O", si: "275-295 mOsmol/kg H₂O"},
			{parameter: "Intact parathyroid hormone (PTH)", range: "10-60 pg/mL", si: "10-60 ng/mL"},
			{parameter: "Phosphorus (inorganic)", range: "3.0-4.5 mg/dL", si: "1.0-1.5 mmol/L"},
			{parameter: "Prolactin (hPRL)", range: "", si: ""},
			{parameter: "Male", range: "<17 ng/mL", si: "<17 μg/L"},
			{parameter: "Female", range: "<25 ng/mL", si: "<25 μg/L"},
			{parameter: "Proteins", range: "", si: ""},
			{parameter: "Total", range: "6.0-7.8 g/dL", si: "60-78 g/L"},
			{parameter: "Albumin", range: "3.5-5.5 g/dL", si: "35-55 g/L"},
			{parameter: "Globulin", range: "2.3-3.5 g/dL", si: "23-35 g/L"},
			{parameter: "Troponin I", range: "<0.04 ng/dL", si: "<0.04 μg/L"},
			{parameter: "TSH", range: "0.4-4.0 μU/mL", si: "0.4-4.0 μU/mL"},
			{parameter: "Thyroidal iodine (¹²³I) uptake", range: "8%-30% of administered dose/24 h", si: "0.08-0.30/24 h"},
			{parameter: "Thyroxine (T₄)", range: "5-12 μg/dL", si: "64-155 nmol/L"},
			{parameter: "Free (T₄)", range: "0.9-1.7 ng/dL", si: "12.0-21.9 pmol/L"},
			{parameter: "Triiodothyronine (T₃) (RIA)", range: "100-200 ng/dL", si: "1.5-3.1 nmol/L"},
			{parameter: "Triiodothyronine (T₃) resin uptake", range: "25%-30%", si: "0.25-0.35"},
			{parameter: "Uric acid", range: "3.0-8.2 mg/dL", si: "0.18-0.48 mmol/L"},
			{parameter: "Immunoglobulins", range: "", si: ""},
			{parameter: "lgA", range: "76-390 mg/dL", si: "0.76-3.90 g/L"},
			{parameter: "lgE", range: "0-380 IU/mL", si: "0-380 kIU/L"},
			{parameter: "lgG", range: "650-1500 mg/dL", si: "6.5-15.0 g/L"},
			{parameter: "lgM", range: "50-300 mg/dL", si: "0.5-3.0 g/L"},
			{parameter: "Gases, arterial blood (room air)", range: "", si: ""},
			{parameter: "pH", range: "7.35-7.45", si: "[H+ ] 36-44 nmol/L"},
			{parameter: "Pco₂", range: "33-45 mm Hg", si: "4.4-5.9 kPa"},
			{parameter: "Po₂", range: "75-105 mm Hg", si: "10.0-14.0 kPa"}
		],
		cerebrospinal: [
			{parameter: 'Cell count', range: '0-5/mm³', si: '0-5 x 10⁶/L'},
			{parameter: 'Chloride', range: '118-132 mEq/L', si: '118-132 mmol/L'},
			{parameter: 'Gamma globulin', range: '3%-12% total proteins', si: '0.03-0.12'},
			{parameter: 'Glucose', range: '40-70 mg/dL', si: '2.2-3.9 mmol/L'},
			{parameter: 'Pressure', range: '70-180 mm H₂O', si: '70-180 mm H₂O'},
			{parameter: 'Proteins, total', range: '<40 mg/dL', si: '<0.40 g/L'},
		],
		blood: [
			{
				parameter: "Erythrocyte count",
				range: "",
				si: ""
			},
			{
				parameter: "Male",
				range: "4.3-5.9 million/mm³",
				si: "4.3-5.9 x 10¹²/L"
			},
			{
				parameter: "Female",
				range: "3.5-5.5 million/mm³",
				si: "3.5-5.5 x 10¹²/L"
			},
			{
				parameter: "Erythrocyte sedimentation rate (Westergren)",
				range: "",
				si: ""
			},
			{
				parameter: "Male",
				range: "0-15 mm/h",
				si: "0-15 mm/h"
			},
			{
				parameter: "Female",
				range: "0-20 mm/h",
				si: "0-20 mm/h"
			},
			{
				parameter: "Hematocrit",
				range: "",
				si: ""
			},
			{
				parameter: "Male",
				range: "41%-53%",
				si: "0.41-0.53"
			},
			{
				parameter: "Female",
				range: "36%-46%",
				si: "0.36-0.46"
			},
			{
				parameter: "Hemoglobin, blood",
				range: "",
				si: ""
			},
			{
				parameter: "Male",
				range: "13.5-17.5 g/dL",
				si: "135-175 g/L"
			},
			{
				parameter: "Female",
				range: "12.0-16.0 g/dL",
				si: "120-160 g/L"
			},
			{
				parameter: "Hemoglobin A₁c",
				range: "≤6%",
				si: "≤42 mmol/mol"
			},
			{
				parameter: "Hemoglobin, plasma",
				range: "<4 mg/dL",
				si: "<0.62 mmol/L"
			},
			{
				parameter: "Leukocyte count (WBC)",
				range: "4500-11,000/mm³",
				si: "4.5-11.0 x 10⁹/L"
			},
			{
				parameter: "Neutrophils, segmented",
				range: "54%-62%",
				si: "0.54-0.62"
			},
			{
				parameter: "Neutrophils, bands",
				range: "3%-5%",
				si: "0.03-0.05"
			},
			{
				parameter: "Eosinophils",
				range: "1%-3%",
				si: "0.01-0.03"
			},
			{
				parameter: "Basophils",
				range: "0%-0.75%",
				si: "0.00-0.0075"
			},
			{
				parameter: "Lymphocytes",
				range: "25%-33%",
				si: "0.25-0.33"
			},
			{
				parameter: "Monocytes",
				range: "3%-7%",
				si: "0.03-0.07"
			},
			{
				parameter: "CD4+ T-lymphocyte count",
				range: "≥500/mm³",
				si: "≥0.5 x 10⁹/L"
			},
			{
				parameter: "Platelet count",
				range: "150,000-400,000/mm³",
				si: "150-400 x 10⁹/L"
			},
			{
				parameter: "Reticulocyte count",
				range: "0.5%-1.5%",
				si: "0.005-0.015"
			},
			{
				parameter: "D-Dimer",
				range: "≤250 ng/mL",
				si: "≤1.4 nmol/L"
			},
			{
				parameter: "Partial thromboplastin time (PTT)(activated)",
				range: "25-40 seconds",
				si: "25-40 seconds"
			},
			{
				parameter: "Prothrombin time (PT)",
				range: "11-15 seconds",
				si: "11-15 seconds"
			},
			{
				parameter: "Mean corpuscular hemoglobin (MCH)",
				range: "25-35 pg/cell",
				si: "0.39-0.54 fmol/cell"
			},
			{
				parameter: "Mean corpuscular hemoglobin concentration (MCHC)",
				range: "31%-36% Hb/cell",
				si: "4.8-5.6 mmol Hb/L"
			},
			{
				parameter: "Mean corpuscular volume (MCV)",
				range: "80-100 μm³",
				si: "80-100 fL"
			},
			{
				parameter: "Plasma",
				range: "",
				si: ""
			},
			{
				parameter: "Male Plasma volume",
				range: "25-43 mL/kg",
				si: "0.025-0.043 L/kg"
			},
			{
				parameter: "Female Plasma volume",
				range: "28-45 mL/kg",
				si: "0.028-0.045 L/kg"
			},
			{
				parameter: "Red cell",
				range: "",
				si: ""
			},
			{
				parameter: "Male Red cell volume",
				range: "20-36 mL/kg",
				si: "0.020-0.036 L/kg"
			},
			{
				parameter: "Female Red cell volume",
				range: "19-31 mL/kg",
				si: "0.019-0.031 L/kg"
			}
		],
		urineBmi: [
			{
				parameter: "Calcium",
				range: "100-300 mg/24 h",
				si: "2.5-7.5 mmol/24 h"
			},
			{
				parameter: "Creatinine clearance",
				range: "",
				si: ""
			},
			{
				parameter: "Male Creatinine clearance",
				range: "97-137 mL/min",
				si: "97-137 mL/min"
			},
			{
				parameter: "Female Creatinine clearance",
				range: "88-128 mL/min",
				si: "88-128 mL/min"
			},
			{
				parameter: "Osmolality",
				range: "50-1200 mOsmol/kg H₂O",
				si: "50-1200 mmol/kg"
			},
			{
				parameter: "Oxalate",
				range: "8-40 μg/mL",
				si: "90-445 μmol/L"
			},
			{
				parameter: "Proteins, total",
				range: "<150 mg/24 h",
				si: "<0.15 g/24 h"
			},
			{
				parameter: "17-Hydroxycorticosteroids",
				range: "",
				si: ""
			},
			{
				parameter: "Male 17-Hydroxycorticosteroids",
				range: "3.0-10.0 mg/24 h",
				si: "8.2-27.6 μmol/24 h"
			},
			{
				parameter: "Female 17-Hydroxycorticosteroids",
				range: "2.0-8.0 mg/24 h",
				si: "5.5-22.0 μmol/24 h"
			},
			{
				parameter: "17-Ketosteroids, total",
				range: "",
				si: ""
			},
			{
				parameter: "Male 17-Ketosteroids",
				range: "8-20 mg/24 h",
				si: "28-70 μmol/24 h"
			},
			{
				parameter: "Female 17-Ketosteroids",
				range: "6-15 mg/24 h",
				si: "21-52 μmol/24 h"
			},
			{
				parameter: "Body Mass Index (BMI)",
				range: "Adult: 19-25 kg/m²",
				si: ""
			}
		]
	};
	
	const isSearchTermInTabContent = (tabId) => {
		return tabContent[tabId].some((row) =>
			Object.values(row).some((value) =>
				value.toLowerCase().includes(searchTerm.toLowerCase())
			)
		);
	};
	
	const getHighlightedText = (text, searchTerm) => {
		if (!searchTerm) return text;
		const regex = new RegExp(`(${searchTerm})`, 'gi');
		return text.split(regex).map((part, index) =>
			regex.test(part) ? (
				<span key={index} className="text-dark bg-yellow">
          {part}
        </span>
			) : (
				part
			)
		);
	};
	
	return (
		<div className="fixed top-10 right-0 h-screen w-[30%] bg-white border-l-2 shadow-lg">
			<div className="p-6">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-lg font-bold">Lab Values</h2>
					<button
						onClick={closeModal}
						className="text-gray-500 hover:text-gray-700 text-xl font-bold"
					>
						×
					</button>
				</div>
				<form className="flex justify-between items-center">
					<div className="mb-4 w-1/2">
						<input
							type="text"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full border border-gray-300 rounded px-3 py-2"
							placeholder="Search..."
						/>
					</div>
					<div className="mb-4 w-1/2 flex items-center">
						<input
							defaultChecked={check}
							onChange={(e) => setCheck(e.target.checked)}
							type="checkbox"
							className="w-1/2 border border-gray-300 rounded px-3 py-2"
							id="check"
						/>
						<label className="block font-medium" htmlFor="check">
							SI Reference Intervals
						</label>
					</div>
				</form>
				
				{tabs.map((tab) => {
					const tabContainsSearchTerm = isSearchTermInTabContent(tab.id);
					return (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`px-4 py-2 whitespace-nowrap rounded-t-lg border-b-2 ${
								searchTerm === '' ?
								(activeTab === tab.id
									? 'bg-gray-200 border-gray-300 text-gray-700'
									: 'bg-transparent text-dark')
									: (tabContainsSearchTerm ? `text-yellow border ${activeTab === tab.id && 'bg-gray-200 border-gray-300 text-gray-700'}` : (activeTab === tab.id ? 'bg-gray-200 border-gray-300 text-gray-700' : ''))
							}`}
						>
							{tab.label}
						</button>
					);
				})}
				
				<div className="h-[700px] overflow-y-auto border border-gray-300 rounded-b-lg p-4">
					<table className="w-full border-collapse border border-gray-300">
						<thead>
						<tr className="bg-gray-100">
							<th className="border border-gray-300 px-4 py-2">
								{activeTab === 'serum' && 'Serum'}
								{activeTab === 'cerebrospinal' && 'Cerebrospinal Fluid'}
								{activeTab === 'blood' && 'Hematologic'}
								{activeTab === 'urineBmi' && 'Urine'}
							</th>
							<th className="border border-gray-300 px-4 py-2">Reference Range</th>
							{check && <th className="border border-gray-300 px-4 py-2">SI Reference Interval</th>}
						</tr>
						</thead>
						<tbody>
						{tabContent[activeTab]
							.filter((row) =>
								Object.values(row).some((value) =>
									value.toLowerCase().includes(searchTerm.toLowerCase())
								)
							)
							.map((row, index) => (
								<tr key={index}>
									<td className="border border-gray-300 px-4 py-2">
										{getHighlightedText(row.parameter, searchTerm)}
									</td>
									<td className="border border-gray-300 px-4 py-2">
										{getHighlightedText(row.range, searchTerm)}
									</td>
									{check && (
										<td className="border border-gray-300 px-4 py-2">
											{getHighlightedText(row.si, searchTerm)}
										</td>
									)}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default LabValues;
