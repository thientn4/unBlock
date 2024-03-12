import React, { useEffect, useState } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function EditGroup() {
  let groups=['rewqgewfwfwqefewqfeqgqgqefweqfqwfewqfewq',2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]
  const styles={
    title:{
      color:'rgb(89,89,89)',
      fontWeight:'bold',
      fontSize:'0.20in'
    },
    input:{
      padding:'0.1in',
      fontSize:'0.20in',
      borderRadius:'0.1in',
      marginTop:'0.15in',
      marginBottom:'0.15in',
      border: '0.5px solid',
      borderColor: 'rgb(46,117,182)'
    },
    buttons:{
      marginTop:'0.15in',
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-around'
    },
    button:{
        backgroundColor:'rgb(46,117,182)',
        height:'0.32in',
        width:'1.2in',
        borderRadius:'0.4in',
        color:'white',
        fontSize:'0.20in'
    },
    scroller:{
      height:'3in',
      borderTop: '0.5px solid',
      borderBottom: '0.5px solid',
      borderColor: 'rgb(46,117,182)',
      overflowY:'auto',
      marginBottom:'0.15in',
    },
    row:{
      width:'3.5in',
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      backgroundColor:'white',
      padding:'0.15in',
      fontWeight:'bold',
      color:'rgb(89,89,89)'
    },
    rowItem:{
      textOverflow: 'ellipsis',
      width:'3in',
      textAlign:'left',
      whiteSpace:'nowrap',
      overflow:'hidden'
    }
  }
    return (
      <div style={{
        //width:'100svw',
        display:'flex',
        flexDirection:'row',
        backgroundColor:'white',
        justifyContent:'center',
        minHeight:'100svh',
        userSelect: 'none'
      }}>
        <div className="Login" style={{
            display:'flex',
            flexDirection:'column',
            width:'4in',
            backgroundColor:'white',
            justifyContent:'center',
            minHeight:'100svh',
            margin:'0.5in'
        }}>
          <div style={styles.title}>Group name:</div>
          <input style={styles.input} placeholder="Group name"></input>
          <div style={styles.title}>Add tags:</div>
          <input style={styles.input} placeholder="Tag"></input>
          <div style={styles.scroller}>
            {groups.map((group,index)=>(
              <div style={styles.row}>
                <div style={styles.rowItem}>{group}</div>
                <div>X</div>
              </div>
            ))}
          </div>
          <div style={styles.title}>Add admins:</div>
          <input style={styles.input} placeholder="Email"></input>
          <div style={styles.scroller}>
            {groups.map((group,index)=>(
              <div style={styles.row}>
                <div style={styles.rowItem}>{group}</div>
                <div>X</div>
              </div>
            ))}
          </div>
          <div style={styles.title}>Add members:</div>
          <input style={styles.input} placeholder="Email"></input>
          <div style={styles.scroller}>
            {groups.map((group,index)=>(
              <div style={styles.row}>
                <div style={styles.rowItem}>{group}</div>
                <div>X</div>
              </div>
            ))}
          </div>
          <div style={styles.buttons}>
            <div style={styles.button}>Add</div>
            <div style={styles.button}>Cancel</div>
          </div>
        </div>
      </div>
    );
}

export default EditGroup;