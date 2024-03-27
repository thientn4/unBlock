import axios from 'axios';
import React, { useEffect, useState } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {useLocation, useNavigate} from 'react-router-dom';

function Account() {
    const navigate=useNavigate();
    const location=useLocation();
    const curGroup=location.state===null?{}:location.state.group
    let [postEditor,setPostEditor]=useState(null);
    let [replyEditor,setReplyEditor]=useState(null);
    let [page,setPage]=useState(1);
    let posts=[
        {
            id:0,
            title: 'otweuoweiruoweiruwerpewirewiuroweutoewutow',
            timestamp: '03/05/2024 - 10:30',
            content: 'TipRanks is investing a multitude of resources every day so millions of retail investors from around the world can access the same data as hedge funds and use top-notch research tools. To continue using TipRanks, please allow this domain to your ad blocker.',
            is_private: true,
            reply_to:null,
            op_email:'ntmthien01@gmail.com'
        },
        {
            id:1,
            title: 'otweuoweiruoweiruwerpewirewiuroweutoewutow',
            timestamp: '03/05/2024 - 10:30',
            content: 'TipRanks is investing a multitude of resources every day so millions of retail investors from around the world can access the same data as hedge funds and use top-notch research tools. To continue using TipRanks, please allow this domain to your ad blocker.',
            is_private: true,
            reply_to:null,
            op_email:'ntmthien01@gmail.com'
        },
        {
            id:2,
            title: 'otweuoweiruoweiruwerpewirewiuroweutoewutow',
            timestamp: '03/05/2024 - 10:30',
            content: 'TipRanks is investing a multitude of resources every day so millions of retail investors from around the world can access the same data as hedge funds and use top-notch research tools. To continue using TipRanks, please allow this domain to your ad blocker.',
            is_private: true,
            reply_to:null,
            op_email:'ntmthien01@gmail.com'
        },
        {
            id:3,
            title: 'otweuoweiruoweiruwerpewirewiuroweutoewutow',
            timestamp: '03/05/2024 - 10:30',
            content: 'TipRanks is investing a multitude of resources every day so millions of retail investors from around the world can access the same data as hedge funds and use top-notch research tools. To continue using TipRanks, please allow this domain to your ad blocker.',
            is_private: true,
            reply_to:null,
            op_email:'ntmthien01@gmail.com'
        },
        {
            id:4,
            title: 'otweuoweiruoweiruwerpewirewiuroweutoewutow',
            timestamp: '03/05/2024 - 10:30',
            content: 'TipRanks is investing a multitude of resources every day so millions of retail investors from around the world can access the same data as hedge funds and use top-notch research tools. To continue using TipRanks, please allow this domain to your ad blocker.',
            is_private: true,
            reply_to:null,
            op_email:'ntmthien01@gmail.com'
        },
        {
            id:5,
            title: 'otweuoweiruoweiruwerpewirewiuroweutoewutow',
            timestamp: '03/05/2024 - 10:30',
            content: 'TipRanks is investing a multitude of resources every day so millions of retail investors from around the world can access the same data as hedge funds and use top-notch research tools. To continue using TipRanks, please allow this domain to your ad blocker.',
            is_private: true,
            reply_to:null,
            op_email:'ntmthien01@gmail.com'
        },
        {
            id:6,
            title: 'otweuoweiruoweiruwerpewirewiuroweutoewutow',
            timestamp: '03/05/2024 - 10:30',
            content: 'TipRanks is investing a multitude of resources every day so millions of retail investors from around the world can access the same data as hedge funds and use top-notch research tools. To continue using TipRanks, please allow this domain to your ad blocker.',
            is_private: true,
            reply_to:null,
            op_email:'ntmthien01@gmail.com'
        },
        {
            id:7,
            title: 'otweuoweiruoweiruwerpewirewiuroweutoewutow',
            timestamp: '03/05/2024 - 10:30',
            content: 'TipRanks is investing a multitude of resources every day so millions of retail investors from around the world can access the same data as hedge funds and use top-notch research tools. To continue using TipRanks, please allow this domain to your ad blocker.',
            is_private: true,
            reply_to:null,
            op_email:'ntmthien01@gmail.com'
        },
        {
            id:8,
            title: 'otweuoweiruoweiruwerpewirewiuroweutoewutow',
            timestamp: '03/05/2024 - 10:30',
            content: 'TipRanks is investing a multitude of resources every day so millions of retail investors from around the world can access the same data as hedge funds and use top-notch research tools. To continue using TipRanks, please allow this domain to your ad blocker.',
            is_private: true,
            reply_to:null,
            op_email:'ntmthien01@gmail.com'
        },
        {
            id:9,
            title: 'otweuoweiruoweiruwerpewirewiuroweutoewutow',
            timestamp: '03/05/2024 - 10:30',
            content: 'TipRanks is investing a multitude of resources every day so millions of retail investors from around the world can access the same data as hedge funds and use top-notch research tools. To continue using TipRanks, please allow this domain to your ad blocker.',
            is_private: true,
            reply_to:null,
            op_email:'ntmthien01@gmail.com'
        },
    ]
    let replies=[
        {
            id:0,
            title: 'otweuoweiruoweiruwerpewirewiuroweutoewutow',
            timestamp: '03/05/2024 - 10:30',
            content: 'TipRanks is investing a multitude of resources every day so millions of retail investors from around the world can access the same data as hedge funds and use top-notch research tools. To continue using TipRanks, please allow this domain to your ad blocker.',
            is_private: true,
            reply_to:null,
            op_email:'ntmthien01@gmail.com'
        },
        {
            id:1,
            title: 'otweuoweiruoweiruwerpewirewiuroweutoewutow',
            timestamp: '03/05/2024 - 10:30',
            content: 'TipRanks is investing a multitude of resources every day so millions of retail investors from around the world can access the same data as hedge funds and use top-notch research tools. To continue using TipRanks, please allow this domain to your ad blocker.',
            is_private: true,
            reply_to:null,
            op_email:'ntmthien01@gmail.com'
        },
        {
            id:2,
            title: 'otweuoweiruoweiruwerpewirewiuroweutoewutow',
            timestamp: '03/05/2024 - 10:30',
            content: 'TipRanks is investing a multitude of resources every day so millions of retail investors from around the world can access the same data as hedge funds and use top-notch research tools. To continue using TipRanks, please allow this domain to your ad blocker.',
            is_private: true,
            reply_to:0,
            op_email:'ntmthien01@gmail.com'
        },
        {
            id:3,
            title: 'otweuoweiruoweiruwerpewirewiuroweutoewutow',
            timestamp: '03/05/2024 - 10:30',
            content: 'TipRanks is investing a multitude of resources every day so millions of retail investors from around the world can access the same data as hedge funds and use top-notch research tools. To continue using TipRanks, please allow this domain to your ad blocker.',
            is_private: true,
            reply_to:null,
            op_email:'ntmthien01@gmail.com'
        },
        {
            id:4,
            title: 'otweuoweiruoweiruwerpewirewiuroweutoewutow',
            timestamp: '03/05/2024 - 10:30',
            content: 'TipRanks is investing a multitude of resources every day so millions of retail investors from around the world can access the same data as hedge funds and use top-notch research tools. To continue using TipRanks, please allow this domain to your ad blocker.',
            is_private: true,
            reply_to:null,
            op_email:'ntmthien01@gmail.com'
        },
        {
            id:5,
            title: 'otweuoweiruoweiruwerpewirewiuroweutoewutow',
            timestamp: '03/05/2024 - 10:30',
            content: 'TipRanks is investing a multitude of resources every day so millions of retail investors from around the world can access the same data as hedge funds and use top-notch research tools. To continue using TipRanks, please allow this domain to your ad blocker.',
            is_private: true,
            reply_to:null,
            op_email:'ntmthien01@gmail.com'
        },
        {
            id:6,
            title: 'otweuoweiruoweiruwerpewirewiuroweutoewutow',
            timestamp: '03/05/2024 - 10:30',
            content: 'TipRanks is investing a multitude of resources every day so millions of retail investors from around the world can access the same data as hedge funds and use top-notch research tools. To continue using TipRanks, please allow this domain to your ad blocker.',
            is_private: true,
            reply_to:2,
            op_email:'ntmthien01@gmail.com'
        },
        {
            id:7,
            title: 'otweuoweiruoweiruwerpewirewiuroweutoewutow',
            timestamp: '03/05/2024 - 10:30',
            content: 'TipRanks is investing a multitude of resources every day so millions of retail investors from around the world can access the same data as hedge funds and use top-notch research tools. To continue using TipRanks, please allow this domain to your ad blocker.',
            is_private: true,
            reply_to:1,
            op_email:'ntmthien01@gmail.com'
        },
        {
            id:8,
            title: 'otweuoweiruoweiruwerpewirewiuroweutoewutow',
            timestamp: '03/05/2024 - 10:30',
            content: 'TipRanks is investing a multitude of resources every day so millions of retail investors from around the world can access the same data as hedge funds and use top-notch research tools. To continue using TipRanks, please allow this domain to your ad blocker.',
            is_private: true,
            reply_to:null,
            op_email:'ntmthien01@gmail.com'
        },
        {
            id:9,
            title: 'otweuoweiruoweiruwerpewirewiuroweutoewutow',
            timestamp: '03/05/2024 - 10:30',
            content: 'TipRanks is investing a multitude of resources every day so millions of retail investors from around the world can access the same data as hedge funds and use top-notch research tools. To continue using TipRanks, please allow this domain to your ad blocker.',
            is_private: true,
            reply_to:6,
            op_email:'ntmthien01@gmail.com'
        },
    ]
    let post_tags=[
        'HW1','HW2','HW3','HW4','HW5','HW6',
    ]
    let group_tags=[
        'HW1','HW2','HW3','HW4','HW5','HW6','HW7','HW8','HW9','HW10','HW11','HW12','HW13','HW14','HW15',
    ]
    let selected_tags=[]
    const content='<h2>fwqfwqfqwf</h2><p>qwrqwrwqr</p><p>qwrwqrq<i><strong>wrqwrq</strong></i>w</p><p></p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 1. lol</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; a. helllo</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; b. quack</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 2. hello</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 3. hey</p><h3>dasdasfasfas</h3><p>asdsadasdasdasdasadad</p><p>asdasdadas</p>'
    const styles={
        account:{
            display:'flex',
            flexDirection:'column',
            backgroundColor:'white',
            justifyContent:'center',
            alignItems:'center', 
            width:'calc(100% - 3.5in)',
            height:'100svh',
            position:'fixed',
            right:0
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
            zIndex:100,
            position:'fixed'
        },
            groupList:{
                paddingTop:'0.45in',
                paddingBottom:'0.45in'
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
              width:'100%',
              boxSizing:'border-box'
            },
            groupPage:{
                height:'100vh',
                width:'100%',
                minWidth:'8in',
                overflowY:'auto',
                display:'flex',
                flexDirection:'column',
                backgroundColor:'white',
                alignItems:'center', 
            },
            tags:{
                overflowX:'auto',
                display:'flex',
                flexDirection:'row'
            },
            tag:{
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
                border: '0.01in solid',
                borderColor:'rgb(46,117,182)'
            },
            inactiveTag:{
                marginBottom:'0.15in',
                backgroundColor:'white',
                height:'0.32in',
                width:'fit-content',
                borderRadius:'0.4in',
                color:'rgb(46,117,182)',
                fontSize:'0.20in',
                padding:'0.02in',
                paddingLeft:'0.15in',
                paddingRight:'0.15in',
                border: '0.01in solid',
                borderColor:'rgb(46,117,182)'
            },
            bar:{
                marginTop:'0.15in',
                marginBottom:'0.15in',
                display:'flex',
                flexDirection:'row',
                justifyContent:'space-between',
                marginTop:'0.2in'
            },
            bottomItem:{
                color:'rgb(46,117,182)',
                fontSize:'0.18in'
            },
            bottomSubBar:{
                display:'flex',
                flexDirection:'row',
                justifyContent:'space-between',
                width:'1.5in'
            },
            replyOg:{
                display:'flex',
                flexDirection:'row',
                justifyContent:'space-between',
                maxWidth:'4in',
                width:'fit-content',
                marginBottom:'0.15in',
                backgroundColor:'rgb(46,117,182)',
                height:'0.32in',
                borderRadius:'0.4in',
                color:'white',
                fontSize:'0.20in',
                padding:'0.02in',
                paddingLeft:'0.15in',
                paddingRight:'0.15in'
            },
            replyOgPost:{
                textOverflow: 'ellipsis',
                maxWidth:'3.6in',
                textAlign:'left',
                whiteSpace:'nowrap',
                overflow:'hidden'
            },
            replyText:{
                padding:'0.04in',
                marginRight:'0.15in',
                paddingLeft:0,
                color:'rgb(46,117,182)',
                fontSize:'0.18in'
            },
            header:{
                textOverflow: 'ellipsis',
                width:'6in',
                textAlign:'left',
                whiteSpace:'nowrap',
                overflow:'hidden',
                fontWeight:'bold',
                fontSize:'0.25in',
                color:'rgb(89,89,89)'
            },
            post:{
                borderBottom: '0.04in solid',
                borderColor: 'rgb(46,117,182)',
                marginBottom:'0.2in'
            }
    }
    let searchReply=(id)=>{
        for(const i in replies){
            if(replies[i].id===id)return replies[i].title
        }
        return null
    }
    let tagHandler=(tag,index)=>{
        let active=false
        for(const i in selected_tags){
            if(selected_tags[i]===tag){
                active=true
                break
            }
        }
        if(active){
            selected_tags=selected_tags.filter((curTag)=>(curTag!==tag))
            document.getElementById("group_tag_"+index).style.color='rgb(46,117,182)'
            document.getElementById("group_tag_"+index).style.backgroundColor='white'
        }else{
            selected_tags.push(tag)
            document.getElementById("group_tag_"+index).style.backgroundColor='rgb(46,117,182)'
            document.getElementById("group_tag_"+index).style.color='white'
        }
        console.log(selected_tags)
    }
    let highlight=(id)=>{
        if(document.getElementById("highlighter_"+id).style.backgroundColor==='rgb(46, 117, 182)'){
            document.getElementById("highlighter_"+id).style.backgroundColor='rgb(255,192,0)'
        }else{
            document.getElementById("highlighter_"+id).style.backgroundColor='rgb(46,117,182)'
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
                    <img style={styles.tool} src={require('../assets/add.png')} alt='logo' onClick={()=>{setPage(3)}}></img> 
                </div>
                <div style={styles.groupList}>
                    {posts.map((block,index)=>(
                        <div style={styles.row}>
                            <div style={styles.title}>{block.title}</div>
                            <div style={styles.timestamp}>{block.timestamp}</div>
                            <div style={styles.content}>{block.content}</div>
                        </div>
                    ))}
                </div>
                <div style={styles.intros}>
                    <img style={styles.tool} src={require('../assets/account.png')} alt='logo' onClick={()=>{navigate("../account")}}></img> 
                    <div style={styles.intro}> {curGroup.name} </div>
                    <img style={styles.tool} src={require('../assets/edit.png')} alt='logo' onClick={()=>{navigate("edit")}}></img> 
                </div>
            </div>
            <div style={styles.account}>
                {page===3 && <div style={styles.groupPage}>
                    <div style={{width:'95%'}}>
                        <input style={styles.input} placeholder="Title"></input>
                        <div style={styles.tags}>
                            {group_tags.map((tag,index)=>
                                (<div 
                                    id = {"group_tag_"+index}
                                    style={{
                                        ...styles.inactiveTag,
                                        marginLeft:index!==0?'0.1in':0
                                    }} 
                                    onClick={()=>{tagHandler(tag,index)}}
                                >{tag}</div>)
                            )}
                        </div>
                        <CKEditor
                            editor={ ClassicEditor }
                            config={{
                                toolbar:[
                                    "heading",
                                    "|",
                                    "bold",
                                    "italic",
                                    "uploadImage",
                                    "|",
                                    "undo",
                                    "redo"
                                ]
                            }}
                            onReady={ editor => {
                                // You can store the "editor" and use when it is needed.
                                setPostEditor(editor)
                            } }
                            onChange={ ( event ) => {
                                console.log( postEditor.getData() );
                            } }
                        />
                        <div style={styles.bar}>
                            <div>
                                <input type="checkbox"></input>
                                <label style={styles.bottomItem}> private to admin </label>
                            </div>
                            <div style={styles.bottomSubBar}>
                                <div style={styles.bottomItem} onClick={()=>{
                                    axios({
                                        url:process.env.REACT_APP_GROUP_BACKEND+'add/post',
                                        method:'GET',
                                        timeout: 20000,
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'token':localStorage.getItem('token')
                                        },
                                        // data:JSON.stringify({
                                        //   name:newName,
                                        //   memberEmails:members,
                                        //   adminEmails:admins,
                                        //   tags:tags
                                        // })
                                      }).then((response)=>{
                                        console.log(response)
                                        if(response.data==='success'){
                                            setPage(1)
                                        }else if(response.data==='invalid token'){
                                            alert("Session expired, please login again")
                                            localStorage.clear();
                                            window.location.assign(window.location.origin);
                                        }else{
                                            console.log(response)
                                            alert("failed to post")
                                        }
                                      }).catch((error)=>{
                                        alert("failed to post")
                                      })
                                }}>post</div>
                                <div style={styles.bottomItem} onClick={()=>{setPage(1)}}>cancel</div>
                            </div>
                        </div>
                    </div>
                </div>}
                {page===2 && <div style={styles.groupPage}>
                    <div style={{width:'95%'}}>
                        <div style={styles.bar}>
                            <div style={styles.header}>
                                {"fjefjewfewhfwkehkewhfkewfhdrdhfhyjygjjbjjhuukhk"}
                            </div>
                        </div>
                        <div style={{
                            display:'flex',
                            flexDirection:'row'
                        }}>
                            <div style={styles.replyText}>Reply to</div>
                            <div style={styles.replyOg}>
                                <div style={styles.replyOgPost}>{"fhjafkashfkajsfkajfakswfwefwefwefwegwegwegwegwegwegwegewgwgeegwewgwe"}</div>
                            </div>
                        </div>
                        <CKEditor
                            editor={ ClassicEditor }
                            config={{
                                toolbar:[
                                    "bold",
                                    "italic",
                                    "uploadImage",
                                    "|",
                                    "undo",
                                    "redo"
                                ]
                            }}
                            onReady={ editor => {
                                // You can store the "editor" and use when it is needed.
                                setReplyEditor(editor)
                            } }
                            onChange={ ( event ) => {
                                console.log( replyEditor.getData() );
                            } }
                        />
                        <div style={styles.bar}>
                            <div>
                                <input type="checkbox"></input>
                                <label style={styles.bottomItem}> private to OP & admin</label>
                            </div>
                            <div style={styles.bottomSubBar}>
                                <div style={styles.bottomItem} onClick={()=>{setPage(1)}}>post</div>
                                <div style={styles.bottomItem} onClick={()=>{setPage(1)}}>cancel</div>
                            </div>
                        </div>
                    </div>
                </div>}
                {page===1 && <div style={styles.groupPage}>
                    <div style={{width:'95%'}}>
                        <div style={styles.post}>
                            <div style={styles.bar}>
                                <div style={styles.header}>
                                    {"fjefjewfewhfwkehkewhfkewfhdrdhfhyjygjjbjjhuukhk"}
                                </div>
                            </div>
                            <div style={styles.tags}>
                                {post_tags.map((post_tag,index)=>(
                                    <div style={{
                                        ...styles.tag,
                                        marginLeft:index!==0?'0.1in':0
                                    }}>{post_tag}</div>
                                ))}
                            </div>
                            <div style={{
                                width:'100%',
                                textAlign:'left'
                            }} dangerouslySetInnerHTML={{ __html: content }}></div>
                            <div style={styles.bar}>
                                    <div style={styles.bottomItem}>make private</div>
                                <div style={styles.bottomSubBar}>
                                    <div style={styles.bottomItem} onClick={()=>{setPage(2)}}>reply</div>
                                    <div style={styles.bottomItem} onClick={()=>{setPage(3)}}>edit</div>
                                    <div style={styles.bottomItem}>delete</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            {replies.map((reply,index)=>(
                                <div id={'comment_'+reply.id}>
                                    <div style={{
                                        display:'flex',
                                        flexDirection:'row',
                                        justifyContent:'space-between',
                                        marginTop:'0.03in'
                                    }}>
                                        <div style={{
                                            display:'flex',
                                            flexDirection:'row',
                                            justifyContent:'left'
                                        }}>
                                            <div 
                                                id={"highlighter_"+reply.id}
                                                style={{
                                                    backgroundColor:'rgb(46,117,182)',
                                                    height:'0.3in',
                                                    width:'0.3in',
                                                    borderRadius:'0.3in',
                                                    marginRight:'0.3in'
                                                }}
                                                onClick={()=>{highlight(reply.id)}}
                                            ></div>
                                            <div style={styles.title}>{reply.op_email}</div>
                                        </div>
                                        <div style={styles.timestamp}>{reply.timestamp}</div>
                                    </div>
                                    <div style={{
                                        marginLeft:'0.13in',
                                        borderLeft: '0.04in solid',
                                        borderColor: 'rgb(46,117,182)',
                                        paddingLeft:'0.44in',
                                        textAlign:'left',
                                        marginTop:'0.008in'
                                    }}>
                                        {reply.reply_to!==null && <div style={styles.replyOg}>
                                            <div 
                                                style={styles.replyOgPost}
                                                onClick={()=>{document.getElementById("comment_"+reply.reply_to).scrollIntoView({behavior: 'smooth'})}}
                                            >
                                                {searchReply(reply.reply_to)}
                                            </div>
                                        </div>}
                                        {reply.reply_to===null && <div style={{height:1}}></div>}
                                        <div dangerouslySetInnerHTML={{ __html: reply.content }}></div>
                                        <div style={{
                                            width:'100%',
                                            display:'flex',
                                            flexDirection:'row',
                                            justifyContent:'space-between',
                                            paddingTop:'0.2in',
                                            paddingBottom:'0.3in'
                                        }}>
                                            <div style={styles.bottomItem}>make private</div>
                                            <div style={styles.bottomSubBar}>
                                                <div style={styles.bottomItem} onClick={()=>{setPage(2)}}>reply</div>
                                                <div style={styles.bottomItem} onClick={()=>{setPage(2)}}>edit</div>
                                                <div style={styles.bottomItem}>delete</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    );
}

export default Account;