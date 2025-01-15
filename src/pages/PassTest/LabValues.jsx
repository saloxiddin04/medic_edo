import React, {useState} from 'react';

const LabValues = ({closeModal}) => {
	const [activeTab, setActiveTab] = useState('serum');
	const [check, setCheck] = useState(false)
	
	const tabs = [
		{id: 'serum', label: 'Serum'},
		{id: 'cerebrospinal', label: 'Cerebrospinal'},
		{id: 'blood', label: 'Blood'},
		{id: 'urineBmi', label: 'Urine and BMI'},
	];
	
	const tabContent = {
		serum: (
			<table className="w-full border-collapse border border-gray-300">
				<thead>
				<tr className="bg-gray-100">
					<th className="border border-gray-300 px-4 py-2">Serum</th>
					<th className="border border-gray-300 px-4 py-2">Reference Range</th>
					{check && <th className="border border-gray-300 px-4 py-2">SI Reference Interval</th>}
				</tr>
				</thead>
				<tbody>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Alanine aminotransferase (ALT)</td>
					<td className="border border-gray-300 px-4 py-2">10-40 U/L</td>
					{check && <td className="border border-gray-300 px-4 py-2">10-40 U/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Aspartate aminotransferase (AST)</td>
					<td className="border border-gray-300 px-4 py-2">12-38 U/L</td>
					{check && <td className="border border-gray-300 px-4 py-2">12-38 U/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Alkaline phosphatase</td>
					<td className="border border-gray-300 px-4 py-2">25-100 U/L</td>
					{check && <td className="border border-gray-300 px-4 py-2">25-100 U/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Amylase</td>
					<td className="border border-gray-300 px-4 py-2">25-125 U/L</td>
					{check && <td className="border border-gray-300 px-4 py-2">25-125 U/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Bilirubin</td>
					<td className="border border-gray-300 px-4 py-2"></td>
					{check && <td className="border border-gray-300 px-4 py-2"></td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Total</td>
					<td className="border border-gray-300 px-4 py-2">0.1-1.0 mg/dL</td>
					{check && <td className="border border-gray-300 px-4 py-2">2-17 μmol/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Direct</td>
					<td className="border border-gray-300 px-4 py-2">0.0-0.3 mg/dL</td>
					{check && <td className="border border-gray-300 px-4 py-2">0-5 μmol/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Calcium</td>
					<td className="border border-gray-300 px-4 py-2">8.4-10.2 mg/dL</td>
					{check && <td className="border border-gray-300 px-4 py-2">2.1-2.6 mmol/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Cholesterol</td>
					<td className="border border-gray-300 px-4 py-2"></td>
					{check && <td className="border border-gray-300 px-4 py-2"></td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Total</td>
					<td className="border border-gray-300 px-4 py-2"></td>
					{check && <td className="border border-gray-300 px-4 py-2"></td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Normal</td>
					<td className="border border-gray-300 px-4 py-2">{'<'}200mg/dL</td>
					{check && <td className="border border-gray-300 px-4 py-2">{'<'}5.2 mmol/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">High</td>
					<td className="border border-gray-300 px-4 py-2">{'>'}240mg/dL</td>
					{check && <td className="border border-gray-300 px-4 py-2">{'>'}6.2 mmol/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">HDL</td>
					<td className="border border-gray-300 px-4 py-2">40-60 mg/dL</td>
					{check && <td className="border border-gray-300 px-4 py-2">1.0-1.6 mmol/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">LDL</td>
					<td className="border border-gray-300 px-4 py-2">{'<'}160 mg/dL</td>
					{check && <td className="border border-gray-300 px-4 py-2">{'<'}4.2 mmol/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Triglycerides</td>
					<td className="border border-gray-300 px-4 py-2"></td>
					{check && <td className="border border-gray-300 px-4 py-2"></td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Normal</td>
					<td className="border border-gray-300 px-4 py-2">{'<'}150 mg/dL</td>
					{check && <td className="border border-gray-300 px-4 py-2">{'<'}1.70 mmol/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Borderline</td>
					<td className="border border-gray-300 px-4 py-2">151-199 mg/dL</td>
					{check && <td className="border border-gray-300 px-4 py-2">1.71-2.25 mmol/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Cortisol</td>
					<td className="border border-gray-300 px-4 py-2"></td>
					{check && <td className="border border-gray-300 px-4 py-2"></td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">0800 h</td>
					<td className="border border-gray-300 px-4 py-2">5-23 μg/dL</td>
					{check && <td className="border border-gray-300 px-4 py-2">138-635 nmol/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">1600 h</td>
					<td className="border border-gray-300 px-4 py-2">3-15 μg/dL</td>
					{check && <td className="border border-gray-300 px-4 py-2">82-413 nmol/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">2000 h</td>
					<td className="border border-gray-300 px-4 py-2">{'<'}50% of 0800 h</td>
					{check && <td className="border border-gray-300 px-4 py-2">Fraction of 0800 h: {'<'}0.50</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Creatine kinase</td>
					<td className="border border-gray-300 px-4 py-2"></td>
					{check && <td className="border border-gray-300 px-4 py-2"></td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Male</td>
					<td className="border border-gray-300 px-4 py-2">25-90 U/L</td>
					{check && <td className="border border-gray-300 px-4 py-2">25-90 U/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Female</td>
					<td className="border border-gray-300 px-4 py-2">10-70 U/L</td>
					{check && <td className="border border-gray-300 px-4 py-2">10-70 U/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Creatinine</td>
					<td className="border border-gray-300 px-4 py-2">0.6-1.2 mg/dL</td>
					{check && <td className="border border-gray-300 px-4 py-2">53-106 μmol/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Urea nitrogen</td>
					<td className="border border-gray-300 px-4 py-2">7-18 mg/dL</td>
					{check && <td className="border border-gray-300 px-4 py-2">1.2-3.0 mmol/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Electrolytes, serum</td>
					<td className="border border-gray-300 px-4 py-2"></td>
					{check && <td className="border border-gray-300 px-4 py-2"></td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Sodium (Na<sup>+</sup>)</td>
					<td className="border border-gray-300 px-4 py-2">136-146 mEq/L</td>
					{check && <td className="border border-gray-300 px-4 py-2">136-146 mmol/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Potassium (K<sup>+</sup>)</td>
					<td className="border border-gray-300 px-4 py-2">3.5-5.0 mEq/L</td>
					{check && <td className="border border-gray-300 px-4 py-2">3.5-5.0 mmol/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Chloride (Cl<sup>+</sup>)</td>
					<td className="border border-gray-300 px-4 py-2">95-105 mEq/L</td>
					{check && <td className="border border-gray-300 px-4 py-2">95-105 mmol/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Bicarbonate (HCO<sub>3</sub><sup>-</sup>)</td>
					<td className="border border-gray-300 px-4 py-2">22-28 mEq/L</td>
					{check && <td className="border border-gray-300 px-4 py-2">22-28 mmol/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Magnesium (Mg<sup>2+</sup>)</td>
					<td className="border border-gray-300 px-4 py-2">1.5-2.0 mEq/L</td>
					{check && <td className="border border-gray-300 px-4 py-2">0.75-1.0 mmol/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Ferritin</td>
					<td className="border border-gray-300 px-4 py-2"></td>
					{check && <td className="border border-gray-300 px-4 py-2"></td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Male</td>
					<td className="border border-gray-300 px-4 py-2">20-250 ng/mL</td>
					{check && <td className="border border-gray-300 px-4 py-2">20-250 μg/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Female</td>
					<td className="border border-gray-300 px-4 py-2">10-120 ng/mL</td>
					{check && <td className="border border-gray-300 px-4 py-2">10-120 μg/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Follicle-stimulating hormone</td>
					<td className="border border-gray-300 px-4 py-2"></td>
					{check && <td className="border border-gray-300 px-4 py-2"></td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Male</td>
					<td className="border border-gray-300 px-4 py-2">4-25 mlU/ml</td>
					{check && <td className="border border-gray-300 px-4 py-2">4-25 U/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Female</td>
					<td className="border border-gray-300 px-4 py-2"></td>
					{check && <td className="border border-gray-300 px-4 py-2"></td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">premenopause</td>
					<td className="border border-gray-300 px-4 py-2">4-30 mlU/ml</td>
					{check && <td className="border border-gray-300 px-4 py-2">4-30 U/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">midcycle peak</td>
					<td className="border border-gray-300 px-4 py-2">10-90 mlU/ml</td>
					{check && <td className="border border-gray-300 px-4 py-2">10-90 U/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">postmenopause</td>
					<td className="border border-gray-300 px-4 py-2">40-250 mlU/ml</td>
					{check && <td className="border border-gray-300 px-4 py-2">40-250 U/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Glucose</td>
					<td className="border border-gray-300 px-4 py-2"></td>
					{check && <td className="border border-gray-300 px-4 py-2"></td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Fasting</td>
					<td className="border border-gray-300 px-4 py-2">70-110 mg/dL</td>
					{check && <td className="border border-gray-300 px-4 py-2">3.8-5.6 mmol/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Random, non-fasting</td>
					<td className="border border-gray-300 px-4 py-2">{'<'}140 mg/dL</td>
					{check && <td className="border border-gray-300 px-4 py-2">{'<'}7.7 mmol/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Growth hormone- arginine stimulation</td>
					<td className="border border-gray-300 px-4 py-2"></td>
					{check && <td className="border border-gray-300 px-4 py-2"></td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Fasting</td>
					<td className="border border-gray-300 px-4 py-2">{'<'}5 ng/mL</td>
					{check && <td className="border border-gray-300 px-4 py-2">{'<'}5 μg/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Provocative stimuli</td>
					<td className="border border-gray-300 px-4 py-2">{'>'}7 ng/mL</td>
					{check && <td className="border border-gray-300 px-4 py-2">{'>'}7 μg/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Iron</td>
					<td className="border border-gray-300 px-4 py-2"></td>
					{check && <td className="border border-gray-300 px-4 py-2"></td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Male</td>
					<td className="border border-gray-300 px-4 py-2">65-175 μg/dL</td>
					{check && <td className="border border-gray-300 px-4 py-2">11.6-31.3 μmol/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Female</td>
					<td className="border border-gray-300 px-4 py-2">50-170 μg/dL</td>
					{check && <td className="border border-gray-300 px-4 py-2">9.0-30.4 μmol/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Total iron-binding capacity</td>
					<td className="border border-gray-300 px-4 py-2">250-450 μg/dL</td>
					{check && <td className="border border-gray-300 px-4 py-2">44.8-71.6 μmol/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Transferrin</td>
					<td className="border border-gray-300 px-4 py-2">200-360 mg/dL</td>
					{check && <td className="border border-gray-300 px-4 py-2">2.0-3.6 g/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Lactate dehydrogenase</td>
					<td className="border border-gray-300 px-4 py-2">45-200 U/L</td>
					{check && <td className="border border-gray-300 px-4 py-2">45-200 U/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Luteinizing hormone</td>
					<td className="border border-gray-300 px-4 py-2"></td>
					{check && <td className="border border-gray-300 px-4 py-2"></td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Male</td>
					<td className="border border-gray-300 px-4 py-2">6-23 mlU/ml</td>
					{check && <td className="border border-gray-300 px-4 py-2">6-23 U/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Female</td>
					<td className="border border-gray-300 px-4 py-2"></td>
					{check && <td className="border border-gray-300 px-4 py-2"></td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">follicular phase</td>
					<td className="border border-gray-300 px-4 py-2">5-30 mlU/ml</td>
					{check && <td className="border border-gray-300 px-4 py-2">5-30 U/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">midcycle</td>
					<td className="border border-gray-300 px-4 py-2">75-150 mlU/ml</td>
					{check && <td className="border border-gray-300 px-4 py-2">75-150 U/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">postmenopause</td>
					<td className="border border-gray-300 px-4 py-2">30-200 mlU/ml</td>
					{check && <td className="border border-gray-300 px-4 py-2">30-200 U/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Osmolality</td>
					<td className="border border-gray-300 px-4 py-2">275-295 mOsmol/kg H<sub>2</sub>O</td>
					{check && <td className="border border-gray-300 px-4 py-2">275-295 mOsmol/kg H<sub>2</sub>O</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Intact parathyroid hormone (PTH)</td>
					<td className="border border-gray-300 px-4 py-2">10-60 pg/mL</td>
					{check && <td className="border border-gray-300 px-4 py-2">10-60 ng/mL</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Phosphorus (inorganic)</td>
					<td className="border border-gray-300 px-4 py-2">3.0-4.5 mg/dL</td>
					{check && <td className="border border-gray-300 px-4 py-2">1.0-1.5 mmol/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Prolactin (hPRL)</td>
					<td className="border border-gray-300 px-4 py-2"></td>
					{check && <td className="border border-gray-300 px-4 py-2"></td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Male</td>
					<td className="border border-gray-300 px-4 py-2">{'<'}17 ng/mL</td>
					{check && <td className="border border-gray-300 px-4 py-2">{'<'}17 μg/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Female</td>
					<td className="border border-gray-300 px-4 py-2">{'<'}25 ng/mL</td>
					{check && <td className="border border-gray-300 px-4 py-2">{'<'}25 μg/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Proteins</td>
					<td className="border border-gray-300 px-4 py-2"></td>
					{check && <td className="border border-gray-300 px-4 py-2"></td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Total</td>
					<td className="border border-gray-300 px-4 py-2">6.0-7.8 g/dL</td>
					{check && <td className="border border-gray-300 px-4 py-2">60-78 g/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Albumin</td>
					<td className="border border-gray-300 px-4 py-2">3.5-5.5 g/dL</td>
					{check && <td className="border border-gray-300 px-4 py-2">35-55 g/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Globulin</td>
					<td className="border border-gray-300 px-4 py-2">2.3-3.5 g/dL</td>
					{check && <td className="border border-gray-300 px-4 py-2">23-35 g/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Troponin I</td>
					<td className="border border-gray-300 px-4 py-2">{'<'}0.04 ng/dL</td>
					{check && <td className="border border-gray-300 px-4 py-2">{'<'}0.04 μg/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">TSH</td>
					<td className="border border-gray-300 px-4 py-2">0.4-4.0 μU/mL</td>
					{check && <td className="border border-gray-300 px-4 py-2">0.4-4.0 μU/mL</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Thyroidal iodine (<sup>123</sup>I) uptake</td>
					<td className="border border-gray-300 px-4 py-2">8%-30% of administered dose/24 h</td>
					{check && <td className="border border-gray-300 px-4 py-2">0.08-0.30/24 h</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Thyroxine (T<sup>4</sup>)</td>
					<td className="border border-gray-300 px-4 py-2">5-12 μg/dL</td>
					{check && <td className="border border-gray-300 px-4 py-2">64-155 nmol/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Free (T<sup>4</sup>)</td>
					<td className="border border-gray-300 px-4 py-2">0.9-1.7 ng/dL</td>
					{check && <td className="border border-gray-300 px-4 py-2">12.0-21.9 pmol/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Triiodothyronine (T<sup>3</sup>) (RIA)</td>
					<td className="border border-gray-300 px-4 py-2">100-200 ng/dL</td>
					{check && <td className="border border-gray-300 px-4 py-2">1.5-3.1 nmol/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Triiodothyronine (T<sup>3</sup>) resin uptake</td>
					<td className="border border-gray-300 px-4 py-2">25%-30%</td>
					{check && <td className="border border-gray-300 px-4 py-2">0.25-0.35</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Uric acid</td>
					<td className="border border-gray-300 px-4 py-2">3.0-8.2 mg/dL</td>
					{check && <td className="border border-gray-300 px-4 py-2">0.18-0.48 mmol/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Immunoglobulins</td>
					<td className="border border-gray-300 px-4 py-2"></td>
					{check && <td className="border border-gray-300 px-4 py-2"></td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">lgA</td>
					<td className="border border-gray-300 px-4 py-2">76-390 mg/dL</td>
					{check && <td className="border border-gray-300 px-4 py-2">0.76-3.90 g/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">lgE</td>
					<td className="border border-gray-300 px-4 py-2">0-380 IU/mL</td>
					{check && <td className="border border-gray-300 px-4 py-2">0-380 kIU/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">lgG</td>
					<td className="border border-gray-300 px-4 py-2">650-1500 mg/dL</td>
					{check && <td className="border border-gray-300 px-4 py-2">6.5-15.0 g/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">lgM</td>
					<td className="border border-gray-300 px-4 py-2">50-300 mg/dL</td>
					{check && <td className="border border-gray-300 px-4 py-2">0.5-3.0 g/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Gases, arterial blood (room air)</td>
					<td className="border border-gray-300 px-4 py-2"></td>
					{check && <td className="border border-gray-300 px-4 py-2"></td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">pH</td>
					<td className="border border-gray-300 px-4 py-2">7.35-7.45</td>
					{check && <td className="border border-gray-300 px-4 py-2">[H<sub>+</sub>] 36-44 nmol/L</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Pco<sub>2</sub></td>
					<td className="border border-gray-300 px-4 py-2">33-45 mm Hg</td>
					{check && <td className="border border-gray-300 px-4 py-2">4.4-5.9 kPa</td>}
				</tr>
				<tr>
					<td className="border border-gray-300 px-4 py-2">Po<sub>2</sub></td>
					<td className="border border-gray-300 px-4 py-2">75-105 mm Hg</td>
					{check && <td className="border border-gray-300 px-4 py-2">10.0-14.0 kPa</td>}
				</tr>
				</tbody>
			</table>
		),
		cerebrospinal: <p>Data for Cerebrospinal will go here.</p>,
		blood: <p>Data for Blood will go here.</p>,
		urineBmi: <p>Data for Urine and BMI will go here.</p>
	};
	
	return (
		<div className="fixed top-10 right-0 h-full w-1/2 bg-white border-l-2 shadow-lg">
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
							className="w-full border border-gray-300 rounded px-3 py-2"
							placeholder="e.g., Hemoglobin"
						/>
					</div>
					<div className="mb-4 w-1/2 flex items-center">
						<input
							defaultChecked={check}
							onChange={(e) => setCheck(e.target.checked)}
							type="checkbox"
							className="w-1/2 border border-gray-300 rounded px-3 py-2"
							placeholder="e.g., Hemoglobin"
							id="check"
						/>
						<label className="block font-medium" htmlFor="check">SI Reference Intervals</label>
					</div>
				</form>
				
				<div className="flex space-x-4 border-b">
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`px-4 py-2 whitespace-nowrap rounded-t-lg border-b-2 ${
								activeTab === tab.id
									? 'bg-blue-100 border-blue-500'
									: 'bg-gray-100 border-gray-300'
							}`}
						>
							{tab.label}
						</button>
					))}
				</div>
				
				<div className="h-[500px] overflow-y-auto border border-gray-300 rounded-b-lg p-4">
					{tabContent[activeTab]}
				</div>
			</div>
		</div>
	);
};

export default LabValues;
