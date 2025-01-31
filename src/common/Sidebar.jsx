import React, {useState} from "react";
import {TbClipboardList, TbLetterL, TbLetterQ} from "react-icons/tb";
import {MdOutlineCreateNewFolder} from "react-icons/md";
import {NavLink, useLocation} from "react-router-dom";
import {ROUTES} from "../Routes/constants";
import {getUserData} from "../auth/jwtService";
import {FaUserAlt, FaUserFriends} from "react-icons/fa";
import {MdGroupAdd} from "react-icons/md";
import {useDispatch, useSelector} from "react-redux";
import {toggleSidebar} from "../features/LocalStorageSlice/LocalStorageSlice";
import {GiTrophyCup} from "react-icons/gi";
import {AiOutlineDown, AiOutlineUp} from "react-icons/ai";

const Sidebar = () => {
	const dispatch = useDispatch()
	const {isSidebarOpen} = useSelector((state) => state.localStorage)
	
	const { pathname } = useLocation();
	
	// Track open/close state for parent menus with children
	const [openMenus, setOpenMenus] = useState({});
	
	const adminMenu = [
		{
			title: "Test",
			icon: <TbClipboardList className="mt-1" size="20" />,
			children: [
				{ title: 'Questions Bank', path: ROUTES.MAIN, icon: <TbLetterQ className="mt-1" size="20"/> },
				{ title: 'Qbank by lesson', path: ROUTES.LESSON_TEST, icon: <TbLetterL className="mt-1" size="20"/> },
			]
		},
		{
			title: "Test Generate",
			icon: <MdOutlineCreateNewFolder className="mt-1" size="20"/>,
			children: [
				{ title: "Module", path: ROUTES.MODULE, icon: <MdOutlineCreateNewFolder className="mt-1" size="20"/> },
				{ title: "System", path: ROUTES.SYSTEM, icon: <MdOutlineCreateNewFolder className="mt-1" size="20"/> },
				{ title: "Test", path: ROUTES.MODULETEST, icon: <MdOutlineCreateNewFolder className="mt-1" size="20"/> },
				{ title: "Lesson By Test", path: ROUTES.LESSON_BY_TESTS, icon: <FaUserFriends size="22" className="mt-1"/> }
			]
		},
		{
			title: "Groups",
			icon: <MdGroupAdd size="22" className="mt-1"/>,
			children: [
				{ title: "Group", path: ROUTES.GROUP, icon: <MdGroupAdd size="22" className="mt-1"/> },
				{ title: "Group Binding", path: ROUTES.GROUP_BINDING, icon: <FaUserFriends size="22" className="mt-1"/> }
			]
		}
	]
	
	const handleCleanCurrentPage = () => {
		localStorage.removeItem('currentPage')
		localStorage.removeItem('ModuleTest')
		localStorage.removeItem('searchTestState')
	}
	
	const toggleMenu = (title) => {
		setOpenMenus((prevState) => ({
			...prevState,
			[title]: !prevState[title],
		}));
	};
	
	const isParentActive = (children) =>
		children?.some((child) => pathname.startsWith(child.path));
	
	return (
		<div className="relative">
			<div
				className={`${
					isSidebarOpen ? 'block sm:block md:block lg:hidden' : 'hidden'
				} fixed top-14 sm:top-14 md:top-[58px] lg:top-16 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-50 z-50`}
				onClick={() => dispatch(toggleSidebar())}
			></div>
			<div
				className={`fixed top-14 sm:top-14 md:top-[58px] lg:top-16 bg-white text-gray-700 h-screen w-56 z-50 py-8 ${
					isSidebarOpen ? "" : "hidden"
				}`}
			>
				{getUserData()?.role === 'admin' ? (
					<>
						<nav>
							<ul>
								{adminMenu.map((menu) => (
									<li key={menu.title}>
										<button
											onClick={() => toggleMenu(menu.title)}
											className={`flex items-center justify-between gap-5 py-2.5 px-4 first:mt-0 my-2 w-full rounded-r transition duration-200 hover:bg-primary/10 ${
												isParentActive(menu.children) ? "bg-primary/20" : ""
											}`}
										>
											<div className="flex items-center gap-5">
												{menu.icon}
												<span>{menu.title}</span>
											</div>
											{openMenus[menu.title] ? <AiOutlineUp/> : <AiOutlineDown/>}
										</button>
										
										{openMenus[menu.title] && (
											<ul className="pl-6">
												{menu.children.map((child) => (
													<li key={child.title}>
														<NavLink
															to={child.path}
															activeclassname="active"
															className="flex w-full items-center gap-5 py-2.5 px-4 rounded-r transition duration-200 hover:bg-primary/10"
														>
															{child.icon}
															<span>{child.title}</span>
														</NavLink>
													</li>
												))}
											</ul>
										)}
									</li>
								))}
								
								{/* Independent Links */}
								<NavLink
									onClick={handleCleanCurrentPage}
									activeclassname="active"
									to={ROUTES.RANKING}
									className="flex w-full items-center gap-5 py-2.5 px-4 rounded-r transition duration-200 hover:bg-primary/10"
								>
									<GiTrophyCup size="22" className="mt-1"/>
									<span>Ranking</span>
								</NavLink>
								<NavLink
									onClick={handleCleanCurrentPage}
									activeclassname="active"
									to={ROUTES.USERS}
									className="flex w-full items-center gap-5 py-2.5 px-4 rounded-r transition duration-200 hover:bg-primary/10"
								>
									<FaUserAlt size="22" className="mt-1"/>
									<span>Users</span>
								</NavLink>
							</ul>
						</nav>
					</>
				) : (
					<>
						<nav>
							<ul>
								<li>
									<NavLink
										activeclassname="active"
										to={ROUTES.MAIN}
										className="flex w-[90%] items-center gap-5 py-2.5 px-4 rounded-r transition duration-200 hover:bg-primary/10"
									>
										<TbLetterQ className="mt-1" size="20"/>
										<span>Question Bank</span>
									</NavLink>
									<NavLink
										activeclassname="active"
										to={ROUTES.LESSON_TEST}
										className="flex w-[90%] items-center gap-5 py-2.5 px-4 rounded-r transition duration-200 hover:bg-primary/10"
									>
										<TbLetterL className="mt-1" size="20"/>
										<span>Qbank by lesson</span>
									</NavLink>
									
									{getUserData() && getUserData().role === "teacher" && (
										<>
											<NavLink
												onClick={handleCleanCurrentPage}
												activeclassname="active"
												to={ROUTES.GROUP_BINDING}
												className="flex w-[90%] items-center gap-5 py-2.5 px-4 rounded-r transition duration-200 hover:bg-primary/10"
											>
												<FaUserFriends size="22" className="mt-1"/>
												<span>Group binding</span>
											</NavLink>
										</>
									)}
									
									<NavLink
										onClick={handleCleanCurrentPage}
										activeclassname="active"
										to={ROUTES.RANKING}
										className="flex w-[90%] items-center gap-5 py-2.5 px-4 rounded-r transition duration-200 hover:bg-primary/10"
									>
										<GiTrophyCup size="22" className="mt-1"/>
										<span>Ranking</span>
									</NavLink>
								
								</li>
							</ul>
						</nav>
					</>
				)}
			</div>
		</div>
	);
};

export default Sidebar;
