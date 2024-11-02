import React from "react";

const Tabs = ({ color, tabs, openTab, setOpenTab }) => {
	return (
		<>
			<div className="flex flex-wrap">
				<div className="w-full">
					<ul
						className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
						role="tablist"
					>
						{tabs && tabs.map((item, idx) => (
							<li key={idx} className="-mb-px mr-2 last:mr-0 text-center hover:bg-gray-100 hover:rounded">
								<a
									className={
										"text-xs font-bold uppercase px-5 py-3 rounded block leading-normal"
									}
									style={{
										// backgroundColor: idx === openTab ? color : '#fff',
										color: idx === openTab ? color : '#ccc',
										borderBottom: idx === openTab ? `1px solid ${color}` : ''
									}}
									onClick={e => {
										localStorage.setItem('currentPage', '1')
										e.preventDefault();
										setOpenTab(idx);
									}}
									data-toggle="tab"
									href={`#link${idx}`}
									role="tablist"
								>
									{item.title}
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
};

export default function TabsRender({ color, tabs, openTab, setOpenTab, isQuery }) {
	return (
		<Tabs color={color} tabs={tabs} openTab={openTab} setOpenTab={setOpenTab} isQuery={isQuery} />
	);
}