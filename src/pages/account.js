import axios from 'axios';
import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';

function Account() {
    const navigate=useNavigate();
    let [groups,setGroups]=useState([])
    const styles={
        account:{
            display:'flex',
            flexDirection:'column',
            backgroundColor:'white',
            justifyContent:'center',
            alignItems:'center', 
            width:'calc(100% - 3.5in)',
            height:'100svh'
        },
            picture:{
                height:'2in',
                width:'2in',
                marginBottom:'0.4in'
            },
            email:{
                marginBottom:'0.3in',
                color:'rgb(89,89,89)',
                fontWeight:'bold',
                fontSize:'0.20in'
            },
            button:{
                backgroundColor:'rgb(46,117,182)',
                height:'0.32in',
                width:'1.2in',
                borderRadius:'0.4in',
                color:'white',
                fontSize:'0.20in'
            },
        groups:{
            backgroundColor:'rgb(157,195,230)',
            height:'100svh',
            overflowY:'auto',
            overflowX:'hidden',
            minWidth:'3.3in'
        },
            groupList:{
                paddingTop:'0.45in'
            },
            tools:{
                display:'flex',
                flexDirection:'row',
                justifyContent:'space-between',
                backgroundColor:'rgb(46,117,182)',
                padding:'0.1in',

                position:'absolute',
                width:'3.1in'
            },
            tool:{
                width:'0.25in',
                height:'0.25in'
            },
            search:{
                width:'2.55in',
                borderRadius:'2.4in',
                paddingLeft:'0.1in',
                paddingRight:'0.1in',
                borderWidth:'0',
                textAlign:'center'
            },
            row:{
                width:'2.7in',
                display:'flex',
                flexDirection:'row',
                justifyContent:'space-between',
                backgroundColor:'white',
                margin:'0.15in',
                padding:'0.1in',
                paddingLeft:'0.15in',
                paddingRight:'0.15in',
                fontWeight:'bold',
                color:'rgb(89,89,89)',
                borderRadius:'0.1in'
            },
            rowItem:{
                textOverflow: 'ellipsis',
                width:'2in',
                textAlign:'left',
                whiteSpace:'nowrap',
                overflow:'hidden'
            }
    }
    let loadGroups=()=>{
        axios({
            url:process.env.REACT_APP_ACCT_BACKEND+'user/groups',
            method:'GET',
            timeout: 20000,
            headers: {
                'Content-Type': 'application/json',
                'token':localStorage.getItem('token')
            }
        }).then((response)=>{
            if(response.data.status==='success'){
                setGroups(response.data.groups)
            }else if(response.data==='invalid token'){
                alert("Session expired, please login again")
                localStorage.clear();
                window.location.assign(window.location.origin);
            }else{
                alert("Failed to load group")
            }
        }).catch((error)=>{
            alert("Failed to load group")
        })
    }
    useEffect(()=>{
        loadGroups()
    },[])
    return (
        <div className="Login" style={{
            display:'flex',
            flexDirection:'row',
            width:'100vw',
            height:'100svh',
            userSelect: 'none'
        }}>
            <div style={styles.groups}>
                <div style={styles.tools}>
                    <input style={styles.search} placeholder="search"></input>
                    <img style={styles.tool} src={require('../assets/add.png')} onClick={()=>{navigate("../group/edit")}} alt='logo'></img> 
                </div>
                <div style={styles.groupList}>
                    {groups.map((group,index)=>(
                        <div style={styles.row} key={index}>
                            <div style={styles.rowItem} onClick={()=>{
                                navigate("../group",{
                                    state:{
                                        group:group
                                    }
                                })
                            }}>{group.name}</div>
                            <div onClick={()=>{
                                let isOwner=(group.ownerEmail===localStorage.getItem('email'))
                                if(!window.confirm("Are you sure you want to "+(isOwner?"delete":"leave")+" group \""+group.name+"\"? Click OK to accept."))return
                                axios({
                                    url:process.env.REACT_APP_ACCT_BACKEND+'remove/group?groupId='+group.id,
                                    method:'POST',
                                    timeout: 20000,
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'token':localStorage.getItem('token')
                                    }
                                }).then((response)=>{
                                    if(response.data==='success'){
                                        alert(isOwner?("group \""+group.name+"\" removed"):("you have left group \""+group.name+"\""))
                                        loadGroups()
                                    }else if(response.data==='invalid token'){
                                        alert("Session expired, please login again")
                                        localStorage.clear();
                                        window.location.assign(window.location.origin);
                                    }else{
                                        alert("Failed to "+ (isOwner?"delete":"leave") +" group \""+group.name+"\"")
                                    }
                                }).catch((error)=>{
                                    alert("Failed to "+ (isOwner?"delete":"leave") +" group \""+group.name+"\"")
                                })
                            }}>X</div>
                        </div>
                    ))}
                </div>
            </div>
            <div style={styles.account}>
                <img style={styles.picture} src={require('../assets/picture.png')} alt='logo'></img> 
                <div style={styles.email}>{localStorage.getItem('email')}</div>
                <div style={styles.button}  onClick={()=>{
                    localStorage.clear()
                    navigate("..")
                }}>sign out</div>
            </div>
        </div>
    );
}

export default Account;