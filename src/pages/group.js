import axios from 'axios';
import React, { useEffect, useState } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {useNavigate} from 'react-router-dom';

function Account() {
    const navigate=useNavigate();
    let [myEditor,setEditor]=useState(null);
    let blocks=[
        {
            title: 'otweuoweiruoweiruwerpewirewiuroweutoewutow',
            timestamp: '03/05/2024 - 10:30',
            content: 'TipRanks is investing a multitude of resources every day so millions of retail investors from around the world can access the same data as hedge funds and use top-notch research tools. To continue using TipRanks, please allow this domain to your ad blocker.'
        },
        {
            title: 'otweuoweiruoweiruwerpewirewiuroweutoewutow',
            timestamp: '03/05/2024 - 10:30',
            content: 'TipRanks is investing a multitude of resources every day so millions of retail investors from around the world can access the same data as hedge funds and use top-notch research tools. To continue using TipRanks, please allow this domain to your ad blocker.'
        },
        {
            title: 'otweuoweiruoweiruwerpewirewiuroweutoewutow',
            timestamp: '03/05/2024 - 10:30',
            content: 'TipRanks is investing a multitude of resources every day so millions of retail investors from around the world can access the same data as hedge funds and use top-notch research tools. To continue using TipRanks, please allow this domain to your ad blocker.'
        },
        {
            title: 'otweuoweiruoweiruwerpewirewiuroweutoewutow',
            timestamp: '03/05/2024 - 10:30',
            content: 'TipRanks is investing a multitude of resources every day so millions of retail investors from around the world can access the same data as hedge funds and use top-notch research tools. To continue using TipRanks, please allow this domain to your ad blocker.'
        },
        {
            title: 'otweuoweiruoweiruwerpewirewiuroweutoewutow',
            timestamp: '03/05/2024 - 10:30',
            content: 'TipRanks is investing a multitude of resources every day so millions of retail investors from around the world can access the same data as hedge funds and use top-notch research tools. To continue using TipRanks, please allow this domain to your ad blocker.'
        },
        {
            title: 'otweuoweiruoweiruwerpewirewiuroweutoewutow',
            timestamp: '03/05/2024 - 10:30',
            content: 'TipRanks is investing a multitude of resources every day so millions of retail investors from around the world can access the same data as hedge funds and use top-notch research tools. To continue using TipRanks, please allow this domain to your ad blocker.'
        },
        {
            title: 'otweuoweiruoweiruwerpewirewiuroweutoewutow',
            timestamp: '03/05/2024 - 10:30',
            content: 'TipRanks is investing a multitude of resources every day so millions of retail investors from around the world can access the same data as hedge funds and use top-notch research tools. To continue using TipRanks, please allow this domain to your ad blocker.'
        },
        {
            title: 'otweuoweiruoweiruwerpewirewiuroweutoewutow',
            timestamp: '03/05/2024 - 10:30',
            content: 'TipRanks is investing a multitude of resources every day so millions of retail investors from around the world can access the same data as hedge funds and use top-notch research tools. To continue using TipRanks, please allow this domain to your ad blocker.'
        },
        {
            title: 'otweuoweiruoweiruwerpewirewiuroweutoewutow',
            timestamp: '03/05/2024 - 10:30',
            content: 'TipRanks is investing a multitude of resources every day so millions of retail investors from around the world can access the same data as hedge funds and use top-notch research tools. To continue using TipRanks, please allow this domain to your ad blocker.'
        },
        {
            title: 'otweuoweiruoweiruwerpewirewiuroweutoewutow',
            timestamp: '03/05/2024 - 10:30',
            content: 'TipRanks is investing a multitude of resources every day so millions of retail investors from around the world can access the same data as hedge funds and use top-notch research tools. To continue using TipRanks, please allow this domain to your ad blocker.'
        },
        {
            title: 'otweuoweiruoweiruwerpewirewiuroweutoewutow',
            timestamp: '03/05/2024 - 10:30',
            content: 'TipRanks is investing a multitude of resources every day so millions of retail investors from around the world can access the same data as hedge funds and use top-notch research tools. To continue using TipRanks, please allow this domain to your ad blocker.'
        },
    ]
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
            overflowY:'auto'
        },
            groupList:{
                paddingTop:'0.45in',
                paddingBottom:'0.3in'
            },
            tools:{
                display:'flex',
                flexDirection:'row',
                justifyContent:'space-between',
                backgroundColor:'rgb(46,117,182)',
                padding:'0.1in',

                position:'fixed',
                width:'3.1in'
            },
            tool:{
                width:'0.25in',
                height:'0.25in'
            },
            search:{
                width:'2.25in',
                borderRadius:'2.4in',
                paddingLeft:'0.1in',
                paddingRight:'0.1in',
                borderWidth:'0',
                textAlign:'center'
            },
            row:{
                width:'2.7in',
                display:'flex',
                flexDirection:'column',
                justifyContent:'space-between',
                backgroundColor:'white',
                margin:'0.15in',
                padding:'0.1in',
                paddingLeft:'0.15in',
                paddingRight:'0.15in',
                borderRadius:'0.1in'
            },
            title:{
                textOverflow: 'ellipsis',
                width:'2in',
                textAlign:'left',
                whiteSpace:'nowrap',
                overflow:'hidden',
                fontWeight:'bold',
                color:'rgb(89,89,89)'
            },
            timestamp:{
                textAlign:'left',
                color:'rgb(46,117,182)',
                paddingBottom:'0.1in'
            },
            content:{
                textOverflow: 'ellipsis',
                color:'black',
                textAlign:'left',
                whiteSpace:'nowrap',
                overflow:'hidden', 
            },
            intros:{
                display:'flex',
                flexDirection:'row',
                justifyContent:'space-between',
                backgroundColor:'rgb(46,117,182)',
                padding:'0.1in',

                position:'fixed',
                width:'3.1in',
                bottom:0
            },
            intro:{
                color:'white'
            },
            input:{
              padding:'0.1in',
              fontSize:'0.20in',
              borderRadius:'0.1in',
              marginTop:'0.15in',
              marginBottom:'0.15in',
              border: '0.5px solid',
              borderColor: 'rgb(46,117,182)',
              textAlign:'center',
              width:'100%'
            }
    }
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
                    <img style={styles.tool} src={require('../assets/filter.png')} alt='logo'></img> 
                    <input style={styles.search} placeholder="search"></input>
                    <img style={styles.tool} src={require('../assets/add.png')} alt='logo'></img> 
                </div>
                <div style={styles.groupList}>
                    {blocks.map((block,index)=>(
                        <div style={styles.row}>
                            <div style={styles.title}>{block.title}</div>
                            <div style={styles.timestamp}>{block.timestamp}</div>
                            <div style={styles.content}>{block.content}</div>
                        </div>
                    ))}
                </div>
                <div style={styles.intros}>
                    <img style={styles.tool} src={require('../assets/account.png')} alt='logo'></img> 
                    <div style={styles.intro}> Group 1 </div>
                    <img style={styles.tool} src={require('../assets/edit.png')} alt='logo'></img> 
                </div>
            </div>
            <div style={styles.account}>
                <div style={{
                    height:'100vh',
                    width:'100%',
                    overflowY:'auto',
                    display:'flex',
                    flexDirection:'column',
                    backgroundColor:'white',
                    alignItems:'center', 
                }}>
                    <div style={{width:'95%', backgroundColor:'black'}}>
                        <input style={styles.input} placeholder="Title"></input>
                        <div style={{
                            overflowX:'auto',
                            display:'flex',
                            flexDirection:'row'
                        }}>
                            {blocks.map((block,index)=>(
                                <div style={{
                                    marginBottom:'0.15in',
                                    backgroundColor:'rgb(46,117,182)',
                                    height:'0.32in',
                                    width:'fit-content',
                                    borderRadius:'0.4in',
                                    color:'white',
                                    fontSize:'0.20in',
                                    padding:'0.02in',
                                    paddingLeft:'0.15in',
                                    paddingRight:'0.15in',
                                    marginRight:'0.1in'
                                }}>{"fhjafkashfkajsfkajfaks"}</div>
                            ))}
                        </div>
                        <CKEditor
                            editor={ ClassicEditor }
                            onReady={ editor => {
                                // You can store the "editor" and use when it is needed.
                                setEditor(editor)
                            } }
                            onChange={ ( event ) => {
                                console.log( myEditor.getData() );
                            } }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Account;