import './Sidebar.css';
import React, { useEffect, useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import  SearchIcon from '@material-ui/icons/Search'
import  RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined'
import { IconButton } from '@material-ui/core';
import Sidebarchart from './Sidebarchart';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import db, { auth } from '../../firebase/firebase';
function Sidebar() {
    const [charts ,setcharts]= useState([]);
    const user = useSelector(selectUser);
    const logout =() =>{
        auth.signOut();
    }

useEffect(()=>{
db.collection("charts").onSnapshot((snapshot)=>{
    setcharts(
        snapshot.docs.map(doc =>({
            id:doc.id,
            data:doc.data()
        }))
    );
})
},[]);

const addchart =()=>{
    const name = prompt("enter chart name");
    if(name){
        db.collection("charts").add({
            chartName:name
        }).catch((err)=>alert(err.message))
    }
}

    return (
        <div className="sidebar">
           
            <div className="sidebar_header">
                <Avatar onClick={logout} src={user.photourl} className="sidebar_headeravatar"> </Avatar>
                <div className="sidebar_info">
                 <SearchIcon className="sidebar_search"/>
                 <input placeholder="Search"></input>
                </div>
                <IconButton onClick={addchart} className="sidebar_inputbutton" >

                <RateReviewOutlinedIcon/>
                </IconButton>
            </div>
            <div className="sidebar_charts">
                {
                    charts.map(({id,data:{chartName}}) =>(<Sidebarchart key={id} chartName={chartName} id={id}/>))
                }

            </div>
        </div>
    )
}

export default Sidebar
