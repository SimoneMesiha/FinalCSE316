import Logo 							from '../navbar/Logo';
import Login 							from '../modals/Login';
import Delete 							from '../modals/Delete';

import RegionContents                   from '../mainRegion/RegionContents'

import CreateAccount 					from '../modals/CreateAccount';
import NavbarOptions 					from '../navbar/NavbarOptions';
import * as mutations 					from '../../cache/mutations';
import SidebarContents 					from '../sidebar/SidebarContents';
import { GET_DB_REGIONS } 				from '../../cache/queries';
import React, { useState } 				from 'react';
import { useMutation, useQuery } 		from '@apollo/client';
import { WNavbar, WSidebar, WNavItem } 	from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WLSide } from 'wt-frontend';
import { UpdateListField_Transaction, 
	SortItems_Transaction,
	UpdateListItems_Transaction, 
	ReorderItems_Transaction, 
	EditItem_Transaction } 				from '../../utils/jsTPS';
import WCard from 'wt-frontend/build/components/wcard/WCard';
import WCContent from 'wt-frontend/build/components/wcard/WCContent';
import WCFooter from 'wt-frontend/build/components/wcard/WCFooter';
import WCMedia from 'wt-frontend/build/components/wcard/WCMedia';

import {Link} from 'react-router-dom'

const Homescreen = (props) => {

	const keyCombination = (e, callback) => {
		if(e.key === 'z' && e.ctrlKey) {
			if(props.tps.hasTransactionToUndo()) {
				tpsUndo();
			}
		}
		else if (e.key === 'y' && e.ctrlKey) { 
			if(props.tps.hasTransactionToRedo()) {
				tpsRedo();
			}
		}
	}
	document.onkeydown = keyCombination;

	const auth = props.user === null ? false : true;
	let todolists 	= [];
	let SidebarData = []; // the elements

	let maps = [];
	const [sortRule, setSortRule] = useState('unsorted'); // 1 is ascending, -1 desc
	const [activeRegion, setActiveRegion] 		= useState({});
	const [showDelete, toggleShowDelete] 	= useState(false);
	const [showLogin, toggleShowLogin] 		= useState(false);
	const [showCreate, toggleShowCreate] 	= useState(false);
	const [canUndo, setCanUndo] = useState(props.tps.hasTransactionToUndo());
	const [canRedo, setCanRedo] = useState(props.tps.hasTransactionToRedo());



	const { loading, error, data, refetch } = useQuery(GET_DB_REGIONS);
	//console.log("the data ")

	if(loading) { console.log(loading, 'loading'); }
	if(error) { console.log(error, 'error'); }
	if(data) { 
		//Assign todolists 
		for(let todo of data.getAllRegions) {
			maps.push(todo)
		//	console.log(maps)
		}
		//if a list is selected, shift it to front of todolists
		// if(activeRegion._id) {
		// 	let selectedListIndex = maps.findIndex(entry => entry._id === activeRegion._id);
		// 	let removed = maps.splice(selectedListIndex, 1);
		// 	maps.unshift(removed[0]);
		// }
		// // create data for sidebar links
		// for(let todo of todolists) {
		// 	if(todo) {
		// 		SidebarData.push({_id: todo._id, name: todo.name});
		// 	}	
		// }
	}


	
	// NOTE: might not need to be async
	const reloadRegion = async () => {
		if (activeRegion._id) {
			let tempID = activeRegion._id;
			let list = todolists.find(list => list._id === tempID);
			setActiveRegion(list);
		}
	}

	const loadRegion = (list) => {
		props.tps.clearAllTransactions();
		setCanUndo(props.tps.hasTransactionToUndo());
		setCanRedo(props.tps.hasTransactionToRedo());
		setActiveRegion(list);

	}

	const mutationOptions = {
		refetchQueries: [{ query: GET_DB_REGIONS }], 
		awaitRefetchQueries: true,
		onCompleted: () => reloadRegion()
	}

	const [ReorderTodoItems] 		= useMutation(mutations.REORDER_ITEMS, mutationOptions);
	const [sortTodoItems] 		= useMutation(mutations.SORT_ITEMS, mutationOptions);
	const [UpdateTodoItemField] 	= useMutation(mutations.UPDATE_ITEM_FIELD, mutationOptions);
	const [UpdateTodolistField] 	= useMutation(mutations.UPDATE_TODOLIST_FIELD, mutationOptions);
	const [DeleteTodoItem] 			= useMutation(mutations.DELETE_ITEM, mutationOptions);
	const [AddTodoItem] 			= useMutation(mutations.ADD_ITEM, mutationOptions);
	const [DeleteTodolist] 			= useMutation(mutations.DELETE_TODOLIST);


	const [CreateMap] 			= useMutation(mutations.CREATE_MAP);
	const [DeleteMap] 			= useMutation(mutations.DELETE_MAP);
	const [UpdateRegionField]   =useMutation(mutations.UPDATE_REGION_FIELD, mutationOptions)




	
	const tpsUndo = async () => {
		const ret = await props.tps.undoTransaction();
		if(ret) {
			setCanUndo(props.tps.hasTransactionToUndo());
			setCanRedo(props.tps.hasTransactionToRedo());
		}
	}

	const tpsRedo = async () => {
		const ret = await props.tps.doTransaction();
		if(ret) {
			setCanUndo(props.tps.hasTransactionToUndo());
			setCanRedo(props.tps.hasTransactionToRedo());
		}
	}




	const createNewList = async () => {
		console.log("maps length before = "+ maps.length)
		let list = {
			    _id: '',
				name: 'dkfasf',
				subregion: [],
				capital: 'dfas',
				leader: 'dfa',
				flag: 'df',
				landmark: [],
				isitmap : true,
				owner : props.user._id,
				parent: "insertParent"
		}
		const { data } = await CreateMap({variables: {regionarray:list} , refetchQueries:{query:GET_DB_REGIONS}} );
		if(data) {
			loadRegion(data.CREATE_MAP);
		} 
		
		window.location.reload("true")
	};


	const deleteMap = async (_id) => {
		console.log(maps)

		console.log("wack")
		DeleteMap({ variables: { _id: _id }, refetchQueries: [{ query: GET_DB_REGIONS }] });
		loadRegion({});

		
		console.log("so we got to delete map which is lit");
	};

	const updateRegionField = async (_id,field,value)=>{
		console.log("mmm we get here")
		await UpdateRegionField({variables:{_id: _id, field: field, value:value}});
		console.log("but do we get here?");

		//window.location.reload("true")
	}







	const addItem = async () => {
		let list = activeRegion;
		const items = list.items;
		const newItem = {
			_id: '',
			description: 'No Description',
			due_date: 'No Date',
			assigned_to: 'No One',
			completed: false
		};
		let opcode = 1;
		let itemID = newItem._id;
		let listID = activeRegion._id;
		let transaction = new UpdateListItems_Transaction(listID, itemID, newItem, opcode, AddTodoItem, DeleteTodoItem);
		props.tps.addTransaction(transaction);
		tpsRedo();
	};

	const deleteItem = async (item, index) => {
		let listID = activeRegion._id;
		let itemID = item._id;
		let opcode = 0;
		let itemToDelete = {
			_id: item._id,
			description: item.description,
			due_date: item.due_date,
			assigned_to: item.assigned_to,
			completed: item.completed
		}
		let transaction = new UpdateListItems_Transaction(listID, itemID, itemToDelete, opcode, AddTodoItem, DeleteTodoItem, index);
		props.tps.addTransaction(transaction);
		tpsRedo();

	};

	const editItem = async (itemID, field, value, prev) => {
		let flag = 0;
		if (field === 'completed') flag = 1;
		let listID = activeRegion._id;
		let transaction = new EditItem_Transaction(listID, itemID, field, prev, value, flag, UpdateTodoItemField);
		props.tps.addTransaction(transaction);
		tpsRedo();

	};

	const reorderItem = async (itemID, dir) => {
		let listID = activeRegion._id;
		let transaction = new ReorderItems_Transaction(listID, itemID, dir, ReorderTodoItems);
		props.tps.addTransaction(transaction);
		tpsRedo();

	};

	
	const deleteList = async (_id) => {
		DeleteTodolist({ variables: { _id: _id }, refetchQueries: [{ query: GET_DB_REGIONS }] });
		loadRegion({});
	};

	const updateListField = async (_id, field, value, prev) => {
		let transaction = new UpdateListField_Transaction(_id, field, prev, value, UpdateTodolistField);
		props.tps.addTransaction(transaction);
		tpsRedo();

	};

	const handleSetActive = (_id) => {
		const selectedList = todolists.find(todo => todo._id === _id);
		loadRegion(selectedList);
	};

	const setShowLogin = () => {
		toggleShowDelete(false);
		toggleShowCreate(false);
		toggleShowLogin(!showLogin);
	};

	const setShowCreate = () => {
		toggleShowDelete(false);
		toggleShowLogin(false);
		toggleShowCreate(!showCreate);
	};

	const setShowDelete = () => {
		toggleShowCreate(false);
		toggleShowLogin(false);
		toggleShowDelete(!showDelete)
	};
	
	const sort = (criteria) => {
		let prevSortRule = sortRule;
		setSortRule(criteria);
		let transaction = new SortItems_Transaction(activeRegion._id, criteria, prevSortRule, sortTodoItems);
		console.log(transaction)
		props.tps.addTransaction(transaction);
		tpsRedo();
		
	}

	return (
		<WLayout wLayout="header">
			<WLHeader>
				<WNavbar color="colored">
					<ul>
						
							<Logo className='logo' />
					</ul>
					<ul>
					
						
							{/* WNAVITEM IS ADDED BY ME */}
						<NavbarOptions
							fetchUser={props.fetchUser} 	auth={auth} 
							setShowCreate={setShowCreate} 	setShowLogin={setShowLogin}
							reloadTodos={refetch} 			setActiveRegion={loadRegion}
						/>
						
					</ul>
				</WNavbar>
			</WLHeader>

		
			<WLMain>
				
				{
					// activeRegion ? 
						
					<div className="container-secondary">
						
						<WLayout wLayout = "header">
							<WLHeader >
							
								<WNavbar className ="headernavbarrr" color="colored">
										Your Maps     
								</WNavbar>
							
							</WLHeader>

								<WLMain>
									<WCard wLayout = "content-footer-media" className ="layout3">
										<WCContent className = "mainContent">

										<RegionContents
											listIDs = {maps}   delete ={deleteMap}
											nameChange ={updateRegionField}

											fetchUser={props.fetchUser} 	auth={auth} 
											setShowCreate={setShowCreate} 	setShowLogin={setShowLogin}
											reloadTodos={refetch} 			setActiveRegion={loadRegion}
											
									/>
										</WCContent>
										<WCFooter className = "footer">
											<button className="newmapbutton" 
											onClick={createNewList}
											>Create New Map</button>

										</WCFooter>

										<WCMedia className = "picture">
											<img src="https://previews.123rf.com/images/vasiu/vasiu0802/vasiu080200013/2554416-world-map-red-globe-america-europe-and-africa.jpg?utm_source=shareasale&utm_medium=affiliate&utm_campaign=389818_1195097&sscid=51k5_1pl8t" alt="Globe Image" title
											="globe image" color = "red" height="200px" width="160px"></img>
										</WCMedia>
									</WCard>
								</WLMain>

							</WLayout>
					</div>
				
				// :
				// 	<div className="container-secondary"> </div>
					
		}

	</WLMain>
		
			{
				showDelete && (<Delete deleteList={deleteList} activeid={activeRegion._id} setShowDelete={setShowDelete} />)
			}

			{
				showCreate && (<CreateAccount fetchUser={props.fetchUser} setShowCreate={setShowCreate} />)
			}
	
			{
				showLogin && (<Login fetchUser={props.fetchUser} reloadTodos={refetch}setShowLogin={setShowLogin} />)
			}

		</WLayout>

		
	);
};

export default Homescreen;
//s