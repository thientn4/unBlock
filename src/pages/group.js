import axios from 'axios';
import React, { useEffect, useState } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {useLocation, useNavigate} from 'react-router-dom';

function Account() {
    const navigate=useNavigate();
    const location=useLocation();
    const curGroup=location.state===null?{}:location.state.group
    let [curEdit,setCurEdit]=useState(null);
    let [curPost,setCurPost]=useState(null);
    let [curPostIndex,setCurPostIndex]=useState(null);
    let [postEditor,setPostEditor]=useState(null);
    let [replyEditor,setReplyEditor]=useState(null);
    let [page,setPage]=useState(1);
    let [posts,setPosts]= useState([])
    let [replies,setReplies]= useState([])
    let [postTags,setPostTags]=useState([])
    let [groupTags,setGroupTags]=useState([])
    let [selectedTags,setSelectedTags]=useState([])
    let [selectedPostTitle,setSelectedPostTitle]=useState("")
    let [selectedPostContent,setSelectedPostContent]=useState("")
    let [postIsPrivate,setPostIsPrivate]=useState(false)
    let [replyTo, setReplyTo]=useState(null)
    const styles={
        postContainer:{
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
        posts:{
            backgroundColor:'rgb(157,195,230)',
            height:'100svh',
            overflowY:'auto',
            zIndex:100,
            position:'fixed',
            minWidth:'3.3in'
        },
            postList:{
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
                width:'2.64in',
                display:'flex',
                flexDirection:'column',
                justifyContent:'space-between',
                backgroundColor:'white',
                margin:'0.15in',
                padding:'0.1in',
                paddingLeft:'0.15in',
                paddingRight:'0.15in',
                borderRadius:'0.1in',
                border:'0.03in solid',
                borderColor:'white'
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
    let htmlToText=(html)=>{
        return html.replace(/<\/p><p>/g, ' ').replace(/<[^>]*>/g, "").replaceAll("&nbsp;", "")
    }
    let searchReply=(id)=>{
        for(const i in replies){
            if(replies[i].id===id)return htmlToText(replies[i].content)
        }
        return null
    }
    let checkSelected=(tag)=>{
        for(const i in selectedTags){
            if(selectedTags[i]===tag){
                return true
            }
        }
        return false
    }
    let checkTagInGroup=(tag)=>{
        for(const i in groupTags){
            if(groupTags[i]===tag){
                return true
            }
        }
        return false
    }
    let tagHandler=(tag,index)=>{
        let active=checkSelected(tag)
        if(active){
            setSelectedTags(selectedTags.filter((curTag)=>(curTag!==tag)))
            document.getElementById("group_tag_"+index).style.color='rgb(46,117,182)'
            document.getElementById("group_tag_"+index).style.backgroundColor='white'
        }else{
            setSelectedTags([tag,...selectedTags])
            document.getElementById("group_tag_"+index).style.backgroundColor='rgb(46,117,182)'
            document.getElementById("group_tag_"+index).style.color='white'
        }
    }
    let highlight=(id)=>{
        let highlight=false;
        if(document.getElementById("highlighter_"+id).style.backgroundColor==='rgb(46, 117, 182)'){
            document.getElementById("highlighter_"+id).style.backgroundColor='rgb(255,192,0)' //yellow
            highlight=true;
        }else{
            document.getElementById("highlighter_"+id).style.backgroundColor='rgb(46,117,182)' //blue
        }
        axios({
            url:process.env.REACT_APP_GROUP_BACKEND+'highlight/post?postId='+id+"&highlight="+highlight,
            method:'POST',
            timeout: 20000,
            headers: {
                'Content-Type': 'application/json',
                'token':localStorage.getItem('token')
            }
        }).then((response)=>{
            if(response.data==='success'){
                console.log("successful highlight")
            }else if(response.data==='invalid token'){
                alert("Session expired, please login again")
                localStorage.clear();
                window.location.assign(window.location.origin);
            }else{
                console.log("failed highlight")
            }
        }).catch((error)=>{
            console.log("failed highlight")
        })
    }
    let pickPost=(post)=>{
        setCurPost(post)
        axios({
            url:process.env.REACT_APP_GROUP_BACKEND+'get/replies?postId='+post.id,
            method:'GET',
            timeout: 20000,
            headers: {
                'Content-Type': 'application/json',
                'token':localStorage.getItem('token')
            }
        }).then((response)=>{
            if(response.data.status==='success'){
                setPostTags(response.data.tags.filter((tag)=>(checkTagInGroup(tag))))
                setReplies(response.data.posts.sort((p1,p2)=>(p1.timestamp<p2.timestamp?-1:1)))
            }else if(response.data==='invalid token'){
                alert("Session expired, please login again")
                localStorage.clear();
                window.location.assign(window.location.origin);
            }else{
                alert("Failed to load replies")
            }
        }).catch((error)=>{
            alert("Failed to load replies")
        })
    }
    let loadPosts=(prePickId)=>{
        axios({
            url:process.env.REACT_APP_GROUP_BACKEND+'get/posts?groupId='+curGroup.id,
            method:'GET',
            timeout: 20000,
            headers: {
                'Content-Type': 'application/json',
                'token':localStorage.getItem('token')
            }
        }).then((response)=>{
            if(response.data.status==='success'){
                setGroupTags(response.data.tags)
                setPosts(response.data.posts.sort((p1,p2)=>(p1.timestamp<p2.timestamp?1:-1)))
                if(prePickId){
                    let prePickIndex=null
                    for(const i in response.data.posts){
                        if(response.data.posts[i].id===prePickId){
                            prePickIndex=i
                        }
                    }
                    if(prePickIndex){
                        pickPost(response.data.posts[prePickIndex])
                        //setCurPostIndex(prePickIndex) //////// fix bug
                        setTimeout(function() { //Start the timer
                            console.log(prePickIndex)
                            setCurPostIndex(prePickIndex) //After 1 second, set render to true
                        }.bind(this), 2000)
                    }
                }
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
    let addPost=(post)=>{
        axios({
            url:process.env.REACT_APP_GROUP_BACKEND+'add/post',
            method:'POST',
            timeout: 20000,
            headers: {
                'Content-Type': 'application/json',
                'token':localStorage.getItem('token')
            },
            data:JSON.stringify(post)
        }).then((response)=>{
            if(response.data==='success'){
                postClean()
                if(page===3)loadPosts()
                if(page===2)pickPost(curPost)
                setPage(1)
            }else if(response.data==='invalid token'){
                alert("Session expired, please login again")
                localStorage.clear();
                window.location.assign(window.location.origin);
            }else{
                alert("failed to post")
            }
        }).catch((error)=>{
            alert("failed to post")
        })
    }
    let editPost=(post,postId)=>{
        axios({
            url:process.env.REACT_APP_GROUP_BACKEND+'edit/post?postId='+postId,
            method:'POST',
            timeout: 20000,
            headers: {
                'Content-Type': 'application/json',
                'token':localStorage.getItem('token')
            },
            data:JSON.stringify(post)
        }).then((response)=>{
            if(response.data==='success'){
                loadPosts(postId)
                setPage(1)
            }else if(response.data==='invalid token'){
                alert("Session expired, please login again")
                localStorage.clear();
                window.location.assign(window.location.origin);
            }else{
                alert("failed to update")
            }
        }).catch((error)=>{
            alert("failed to update")
        })
    }
    let deletePost=(postId,isReply)=>{
        if(!window.confirm("Are you sure you want to delete this "+(isReply?"reply":"post")+"? Click OK to accept."))return
        axios({
            url:process.env.REACT_APP_GROUP_BACKEND+'delete/post?postId='+postId,
            method:'POST',
            timeout: 20000,
            headers: {
                'Content-Type': 'application/json',
                'token':localStorage.getItem('token')
            }
        }).then((response)=>{
            if(response.data==='success'){
                if(isReply){
                    pickPost(curPost)
                }else{
                    loadPosts()
                    setCurPost(null)
                    setCurPostIndex(null)
                    setPage(1)
                }
            }else if(response.data==='invalid token'){
                alert("Session expired, please login again")
                localStorage.clear();
                window.location.assign(window.location.origin);
            }else{
                alert("failed to delete post")
            }
        }).catch((error)=>{
            alert("failed to delete post")
        })
    }
    let postClean=()=>{
        setSelectedPostTitle("")
        setSelectedPostContent("")
        setSelectedTags([])
        setReplyTo(null)
    }
    useEffect(()=>{
        loadPosts()
    },[])
    return (
        <div className="Login" style={{
            display:'flex',
            flexDirection:'row',
            width:'100vw',
            height:'100svh',
            userSelect: 'none'
        }}>
            <div style={styles.posts}>
                <div style={styles.tools}>
                    <img style={styles.tool} src={require('../assets/filter.png')} alt='logo'></img> 
                    <input style={styles.search} placeholder="search"></input>
                    <img style={styles.tool} src={require('../assets/add.png')} alt='logo' onClick={()=>{
                        setCurEdit(null)
                        setSelectedTags([])
                        setSelectedPostTitle("")
                        setPostIsPrivate(false)
                        setPage(3)
                    }}></img> 
                </div>
                <div style={styles.postList}>
                    {posts.map((block,index)=>(
                        <div 
                            style={{...styles.row,borderColor:index===curPostIndex?'rgb(46,117,182)':'white'}} 
                            key={index} 
                            onClick={()=>{
                                setPage(1)
                                pickPost(block,index)
                                setCurPostIndex(index)
                            }}
                        >
                            <div style={styles.title}>{block.title}</div>
                            <div style={styles.timestamp}>{new Date(block.timestamp).toString().substring(4,21)}</div>
                            <div style={styles.content}>{htmlToText(block.content)}</div>
                        </div>
                    ))}
                </div>
                <div style={styles.intros}>
                    <img style={styles.tool} src={require('../assets/account.png')} alt='logo' onClick={()=>{navigate("../account")}}></img> 
                    <div style={styles.intro}> {curGroup.name} </div>
                    <img 
                        style={styles.tool} 
                        src={require('../assets/edit.png')} 
                        alt='logo' 
                        onClick={()=>{navigate("edit",{
                            state:{
                                group:{...curGroup,tags:groupTags} /// add groupTags to curGroup
                            }
                        })}}
                    ></img> 
                </div>
            </div>
            <div style={styles.postContainer}>
                {page===3 && <div style={styles.groupPage}>
                    <div style={{width:'95%'}}>
                        <input 
                            style={styles.input} 
                            placeholder="Title"
                            value={selectedPostTitle}
                            onChange={(e) => setSelectedPostTitle(e.target.value)}
                        ></input>
                        <div style={styles.tags}>
                            {groupTags.map((tag,index)=>
                                (<div 
                                    key={index}
                                    id = {"group_tag_"+index}
                                    style={{
                                        ...(!checkSelected(tag)?styles.inactiveTag:styles.tag),
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
                            data={curEdit?curEdit.content:""}
                            onReady={ editor => {
                                // You can store the "editor" and use when it is needed.
                                setPostEditor(editor)
                                if(curEdit)setSelectedPostContent(curEdit.content)
                                else setSelectedPostContent("")
                            } }
                            onChange={ ( event ) => {
                                setSelectedPostContent(postEditor.getData());
                            } }
                        />
                        <div style={styles.bar}>
                            <div>
                                <input type="checkbox" onChange = {(e)=>setPostIsPrivate(e.target.checked)} checked={postIsPrivate}></input>
                                {/*  curEdit?curEdit.private:false*/}
                                <label style={styles.bottomItem}> private to admin </label>
                            </div>
                            <div style={styles.bottomSubBar}>
                                <div style={styles.bottomItem} onClick={()=>{
                                    if(selectedPostTitle.trim()==="" || selectedPostContent.trim()===""){
                                        alert("title and content are required")
                                        return
                                    }
                                    if(curEdit){
                                        editPost({
                                            title:selectedPostTitle,
                                            content:selectedPostContent,
                                            isPrivate:postIsPrivate,
                                            tags:selectedTags
                                        },curEdit.id)
                                    }else{
                                        addPost({
                                            groupId:curGroup.id,
                                            replyTo:-1,
                                            commentTo:-1,
                                            title:selectedPostTitle,
                                            content:selectedPostContent,
                                            isPrivate:postIsPrivate,
                                            isHighlight:false,
                                            tags:selectedTags
                                        })
                                    }
                                }}>{curEdit?"update":"post"}</div>
                                <div style={styles.bottomItem} onClick={()=>{
                                    setPage(1)
                                    postClean()
                                }}>cancel</div>
                            </div>
                        </div>
                    </div>
                </div>}
                {page===2 && <div style={styles.groupPage}>
                    <div style={{width:'95%'}}>
                        <div style={styles.bar}>
                            <div style={styles.header}>
                                {curPost.title}
                            </div>
                        </div>
                        {replyTo && <div style={{
                            display:'flex',
                            flexDirection:'row'
                        }}>
                            <div style={styles.replyText}>Reply to</div>
                            <div style={styles.replyOg}>
                                <div style={styles.replyOgPost}>{htmlToText(replyTo.content)}</div>
                            </div>
                        </div>}
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
                            data={curEdit?curEdit.content:""}
                            onReady={ editor => {
                                // You can store the "editor" and use when it is needed.
                                setReplyEditor(editor)
                                if(curEdit)setSelectedPostContent(curEdit.content)
                                else setSelectedPostContent("")
                            } }
                            onChange={ ( event ) => {
                                setSelectedPostContent(replyEditor.getData());
                            } }
                        />
                        <div style={styles.bar}>
                            <div>
                                <input type="checkbox" onChange = {(e)=>setPostIsPrivate(e.target.checked)} checked={postIsPrivate}></input>
                                <label style={styles.bottomItem}> private to OP & admin</label>
                            </div>
                            <div style={styles.bottomSubBar}>
                                <div style={styles.bottomItem} onClick={()=>{
                                    if(selectedPostContent.trim()==="")return
                                    if(curEdit){
                                        editPost({
                                            title:null,
                                            content:selectedPostContent,
                                            isPrivate:postIsPrivate,
                                            tags:[]
                                        },curEdit.id)
                                    }else{
                                        addPost({
                                            groupId:curGroup.id,
                                            replyTo:replyTo?replyTo.id:-1,
                                            commentTo:curPost.id,
                                            title:null,
                                            content:selectedPostContent,
                                            isPrivate:postIsPrivate,
                                            isHighlight:false,
                                            tags:[]
                                        })
                                    }
                                }}>{curEdit?"update":"post"}</div>
                                <div style={styles.bottomItem} onClick={()=>{
                                    setPage(1)
                                    postClean()
                                }}>cancel</div>
                            </div>
                        </div>
                    </div>
                </div>}
                {page===1 && curPost && <div style={styles.groupPage}>
                    <div style={{width:'95%'}}>
                        <div style={styles.post}>
                            <div style={styles.bar}>
                                <div style={styles.header}>
                                    {curPost.title}
                                </div>
                            </div>
                            <div style={styles.tags}>
                                {postTags.map((post_tag,index)=>(
                                    <div key = {index} style={{
                                        ...styles.tag,
                                        marginLeft:index!==0?'0.1in':0
                                    }}>{post_tag}</div>
                                ))}
                            </div>
                            <div style={{
                                width:'100%',
                                textAlign:'left'
                            }} dangerouslySetInnerHTML={{ __html: curPost.content }}></div>
                            <div style={styles.bar}>
                                <div style={styles.bottomSubBar}>
                                    <div style={styles.bottomItem} onClick={()=>{
                                        setCurEdit(null)
                                        setPostIsPrivate(false)
                                        setPage(2)
                                    }}>reply</div>
                                    <div style={styles.bottomItem} onClick={()=>{
                                        setCurEdit(curPost)
                                        setSelectedPostTitle(curPost.title)
                                        setSelectedTags(postTags)
                                        setPostIsPrivate(curPost.private)
                                        setPage(3)
                                    }}>edit</div>
                                    <div style={styles.bottomItem} onClick={()=>{deletePost(curPost.id,false)}}>delete</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            {replies.map((reply,index)=>{
                                let replyToContent=searchReply(reply.replyTo)
                                return (<div key={index} id={'comment_'+reply.id}>
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
                                                    backgroundColor:reply.highlight?'rgb(255,192,0)':'rgb(46,117,182)',
                                                    height:'0.3in',
                                                    width:'0.3in',
                                                    borderRadius:'0.3in',
                                                    marginRight:'0.3in'
                                                }}
                                                onClick={(e)=>{highlight(reply.id)}}
                                            ></div>
                                            <div style={styles.title}>{reply.opEmail}</div>
                                        </div>
                                        <div style={styles.timestamp}>{new Date(reply.timestamp).toString().substring(4,21)}</div>
                                    </div>
                                    <div style={{
                                        marginLeft:'0.13in',
                                        borderLeft: '0.04in solid',
                                        borderColor: index!==(replies.length-1)?'rgb(46,117,182)':'white',
                                        paddingLeft:'0.44in',
                                        textAlign:'left',
                                        marginTop:'0.008in'
                                    }}>
                                        {reply.replyTo !== null && reply.replyTo !== 0 && <div style={{
                                                ...styles.replyOg,
                                                ...(replyToContent===null?{backgroundColor:'rgb(157,195,230)'}:{})
                                            }}>
                                            <div 
                                                style={styles.replyOgPost}
                                                onClick={()=>{if(replyToContent)document.getElementById("comment_"+reply.replyTo).scrollIntoView({behavior: 'smooth'})}}
                                            >
                                                {replyToContent?replyToContent:'reply deleted'}
                                            </div>
                                        </div>}
                                        {(reply.replyTo===null || reply.replyTo===0) && <div style={{height:1}}></div>}
                                        <div dangerouslySetInnerHTML={{ __html: reply.content }}></div>
                                        <div style={{
                                            width:'100%',
                                            display:'flex',
                                            flexDirection:'row',
                                            justifyContent:'space-between',
                                            paddingTop:'0.2in',
                                            paddingBottom:'0.3in'
                                        }}>
                                            <div style={styles.bottomSubBar}>
                                                <div style={styles.bottomItem} onClick={()=>{
                                                    setReplyTo(reply)
                                                    setCurEdit(null)
                                                    setPostIsPrivate(false)
                                                    setPage(2)
                                                }}>reply</div>
                                                <div style={styles.bottomItem} onClick={()=>{
                                                    setCurEdit(reply)
                                                    setPostIsPrivate(reply.private)
                                                    setPage(2)
                                                }}>edit</div>
                                                <div style={styles.bottomItem}  onClick={()=>{deletePost(reply.id,true)}}>delete</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>)
                            })}
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    );
}

export default Account;