import axios from 'axios';
import React, { useEffect, useState } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import {useLocation, useNavigate} from 'react-router-dom';

function Account() {
    const userEmail=localStorage.getItem('email')
    const navigate=useNavigate();
    const location=useLocation();
    const curGroup=location.state===null?{}:location.state.group
    const [curEdit,setCurEdit]=useState(null);
    const [curPost,setCurPost]=useState(null);
    const [postEditor,setPostEditor]=useState(null);
    const [replyEditor,setReplyEditor]=useState(null);
    const [page,setPage]=useState(1);
    const [posts,setPosts]= useState([])
    const [filteredPosts,setFilteredPosts]= useState([])
    const [displayedPosts,setDisplayedPosts]= useState([])
    const [replies,setReplies]= useState([])
    const [postTags,setPostTags]=useState([])
    const [groupTags,setGroupTags]=useState([])
    const [selectedTags,setSelectedTags]=useState([])
    const [selectedPostTitle,setSelectedPostTitle]=useState("")
    const [selectedPostContent,setSelectedPostContent]=useState("")
    const [postIsPrivate,setPostIsPrivate]=useState(false)
    const [postHighlight,setPostHighlight]=useState(false)
    const [filter,setFilter]=useState(false)
    const [filterTags,setFilterTags]=useState([])
    const [replyTo, setReplyTo]=useState(null)
    const [searchText,setSearchText]=useState("")
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
                width:'0.2in',
                height:'0.2in', 
                border:'0.03in solid',
                borderRadius:'0.2in',
                borderColor:'white',
                backgroundColor:'white'
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
            },
        contentInput:{
            border: '0.5px solid',
            borderRadius:'0.02in',
            borderColor: 'rgb(192,192,192)'
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
    let checkFiltered=(tag)=>{
        for(const i in filterTags){
            if(filterTags[i]===tag){
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
    function modifyImageString(htmlString) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
      
        const figures = doc.querySelectorAll('figure.image.image_resized');
      
        figures.forEach(figure => {
          const img = figure.querySelector('img');
          img.removeAttribute("height");
          img.style.width = figure.style.width;
        });
      
        return doc.body.innerHTML;
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
                setReplies(response.data.posts.filter((reply)=>(!reply.private || reply.opEmail === userEmail || post.opEmail === userEmail || curGroup.isAdmin)).sort((p1,p2)=>(p1.timestamp<p2.timestamp?-1:1)))
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
                let postRes=response.data.posts
                    .filter((post)=>(!post.private || post.opEmail === userEmail || curGroup.isAdmin))
                    .sort((p1,p2)=>(p1.highlight===p2.highlight?(p1.timestamp<p2.timestamp?1:-1):(p1.highlight?-1:1)))
                setPosts(postRes)
                for(const i in filterTags){
                    let tag = filterTags[i]
                    postRes=postRes.filter((post)=>post.tags.includes(tag))
                }
                setFilteredPosts(postRes)
                if(searchText!==""){
                    postRes=postRes.filter((post)=>(
                        post.content.toLowerCase().includes(searchText.toLowerCase())
                        ||
                        post.title.toLowerCase().includes(searchText.toLowerCase())
                    ))
                }
                setDisplayedPosts(postRes)
                if(prePickId){
                    for(const i in postRes){
                        if(postRes[i].id===prePickId){
                            pickPost(postRes[i])
                            break
                        }
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
                if(post.title)alert("post added")
                postClean()
                loadPosts(curPost?curPost.id:null)
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
                if(post.title) loadPosts(postId)
                else loadPosts(curPost.id)
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
                    <img style={{...styles.tool, borderColor:((filter || filterTags.length===0)?'white':'rgb(255,192,0)')}} src={require(filter?'../assets/cancel.png':'../assets/filter.png')} alt='logo' onClick={()=>{
                        setCurPost(null)
                        if(filter){
                            let newPosts=posts
                            for(const i in filterTags){
                                let tag = filterTags[i]
                                newPosts=newPosts.filter((post)=>post.tags.includes(tag))
                            }
                            setFilteredPosts(newPosts)
                            setDisplayedPosts(newPosts)
                        }else{
                            setSearchText("")
                            setDisplayedPosts(filteredPosts)
                            setCurPost(null)
                        }
                        setFilter(!filter)
                    }}></img> 
                    {!filter && <input style={styles.search} placeholder="search" value={searchText} onChange={
                        (e) => {
                            setCurPost(null)
                            setSearchText(e.target.value)
                            setDisplayedPosts(filteredPosts.filter((post)=>(
                                htmlToText(post.content).toLowerCase().includes(e.target.value.toLowerCase())
                                ||
                                post.title.toLowerCase().includes(e.target.value.toLowerCase())
                            )))
                        }
                    }></input>}
                    {!filter && <img style={styles.tool} src={require('../assets/add.png')} alt='logo' onClick={()=>{
                        setCurEdit(null)
                        setSelectedTags([])
                        setSelectedPostTitle("")
                        setPostIsPrivate(false)
                        setPostHighlight(false)
                        setSearchText("")
                        setDisplayedPosts(filteredPosts)
                        setCurPost(null)
                        setPage(3)
                    }}></img> }
                    {filter && <img style={styles.tool} src={require('../assets/reset.png')} alt='logo' onClick={()=>{setFilterTags([])}}></img> }
                </div>
                <div style={styles.postList}>
                    {!filter && <div>
                        {displayedPosts.map((block,index)=>(
                            <div 
                                style={{
                                    ...styles.row,
                                    borderColor:block.id===(curPost?curPost.id:null)?'rgb(46,117,182)':(block.highlight?'rgb(255,255,204':'white'),
                                    ...(block.highlight?{backgroundColor:'rgb(255,255,204'}:{})
                                }} 
                                key={index} 
                                onClick={()=>{
                                    setPage(1)
                                    pickPost(block,index)
                                }}
                            >
                                <div style={styles.title}>{block.title}</div>
                                <div style={styles.timestamp}>{new Date(block.timestamp).toString().substring(4,21)}</div>
                                <div style={styles.content}>{htmlToText(block.content)}</div>
                            </div>
                        ))}
                    </div>}
                    {filter && <div>
                        {groupTags.map((tag,index)=>(
                            <div
                                style={{...styles.row,borderColor:checkFiltered(tag)?'rgb(46,117,182)':'white'}} 
                                onClick={()=>{
                                    if(checkFiltered(tag))setFilterTags(filterTags.filter((curTag)=>(curTag!==tag)))
                                    else setFilterTags([...filterTags,tag])
                                }}
                            >
                                {tag}
                            </div>
                        ))}
                    </div>}
                </div>
                <div style={styles.intros}>
                    <img style={styles.tool} src={require('../assets/account.png')} alt='logo' onClick={()=>{navigate("../account")}}></img> 
                    <div style={styles.intro}> {curGroup.name} </div>
                    {curGroup.ownerEmail === userEmail && <img 
                        style={styles.tool} 
                        src={require('../assets/edit.png')} 
                        alt='logo' 
                        onClick={()=>{navigate("edit",{
                            state:{
                                group:{...curGroup,tags:groupTags} /// add groupTags to curGroup
                            }
                        })}}
                    ></img> }
                    {curGroup.ownerEmail !== userEmail && <div style={{width:'0.25in'}}></div> }
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
                        <div id="toolbar-container"></div>
                        <div style={styles.contentInput}>
                            <CKEditor
                                editor={ DecoupledEditor }
                                config={{
                                    toolbar:[
                                        "bold",
                                        "italic",
                                        "uploadImage",
                                        "|",
                                        "undo",
                                        "redo"
                                    ],
                                    ckfinder: {
                                        // Upload the images to the server using the CKFinder QuickUpload command.
                                        uploadUrl: 'https://ckeditor.com/apps/ckfinder/3.5.0/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json'
                                    },
                                    image:{
                                        //https://craftcms.stackexchange.com/questions/41010/craft-4-ckeditor-5-image-resizeoptions-not-showing-in-image-toolbar
                                        "toolbar": []
                                    }
                                }}
                                data={curEdit?curEdit.content:""}
                                onReady={ editor => {
                                    const toolbarContainer = document.querySelector( '#toolbar-container' );
                                    toolbarContainer.appendChild( editor.ui.view.toolbar.element );
                                    // You can store the "editor" and use when it is needed.
                                    setPostEditor(editor)
                                    if(curEdit)setSelectedPostContent(curEdit.content)
                                    else setSelectedPostContent("")
                                } }
                                onChange={ ( event ) => {
                                    setSelectedPostContent(postEditor.getData());
                                } }
                            />
                        </div>
                        <div style={styles.bar}>
                            <div style={{...styles.bottomSubBar,width:'3in'}}>
                                <div>
                                    <input type="checkbox" onChange = {(e)=>setPostIsPrivate(e.target.checked)} checked={postIsPrivate}></input>
                                    {/*  curEdit?curEdit.private:false*/}
                                    <label style={styles.bottomItem}> private to admin </label>
                                </div>
                                <div>
                                    <input type="checkbox" onChange = {(e)=>setPostHighlight(e.target.checked)} checked={postHighlight}></input>
                                    {/*  curEdit?curEdit.private:false*/}
                                    <label style={styles.bottomItem}> highlight </label>
                                </div>
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
                                            content:modifyImageString(selectedPostContent),
                                            isPrivate:postIsPrivate,
                                            isHighlight:postHighlight,
                                            tags:selectedTags
                                        },curEdit.id)
                                    }else{
                                        addPost({
                                            groupId:curGroup.id,
                                            replyTo:-1,
                                            commentTo:-1,
                                            title:selectedPostTitle,
                                            content:modifyImageString(selectedPostContent),
                                            isPrivate:postIsPrivate,
                                            isHighlight:postHighlight,
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
                        <div id="toolbar-container"></div>
                        <div style={styles.contentInput}>
                            <CKEditor
                                editor={ DecoupledEditor }
                                config={{
                                    toolbar:[
                                        "bold",
                                        "italic",
                                        "uploadImage",
                                        "|",
                                        "undo",
                                        "redo"
                                    ],
                                    ckfinder: {
                                        // Upload the images to the server using the CKFinder QuickUpload command.
                                        uploadUrl: 'https://ckeditor.com/apps/ckfinder/3.5.0/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json'
                                    },
                                    image:{
                                        //https://craftcms.stackexchange.com/questions/41010/craft-4-ckeditor-5-image-resizeoptions-not-showing-in-image-toolbar
                                        "toolbar": []
                                    }
                                }}
                                data={curEdit?curEdit.content:""}
                                onReady={ editor => {
                                    const toolbarContainer = document.querySelector( '#toolbar-container' );
                                    toolbarContainer.appendChild( editor.ui.view.toolbar.element );
                                    // You can store the "editor" and use when it is needed.
                                    setReplyEditor(editor)
                                    if(curEdit)setSelectedPostContent(curEdit.content)
                                    else setSelectedPostContent("")
                                } }
                                onChange={ ( event ) => {
                                    setSelectedPostContent(replyEditor.getData());
                                } }
                            />
                        </div>
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
                                            content:modifyImageString(selectedPostContent),
                                            isPrivate:postIsPrivate,
                                            isHighlight:curEdit.highlight,
                                            tags:[]
                                        },curEdit.id)
                                    }else{
                                        addPost({
                                            groupId:curGroup.id,
                                            replyTo:replyTo?replyTo.id:-1,
                                            commentTo:curPost.id,
                                            title:null,
                                            content:modifyImageString(selectedPostContent),
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
                                        setPostHighlight(false)
                                        setPage(2)
                                    }}>reply</div>
                                    {userEmail === curPost.opEmail && <div style={styles.bottomItem} onClick={()=>{
                                        setCurEdit(curPost)
                                        setSelectedPostTitle(curPost.title)
                                        setSelectedTags(postTags)
                                        setPostIsPrivate(curPost.private)
                                        setPostHighlight(curPost.highlight)
                                        setPage(3)
                                    }}>edit</div>}
                                    {userEmail === curPost.opEmail && <div style={styles.bottomItem} onClick={()=>{deletePost(curPost.id,false)}}>delete</div>}
                                </div>
                                {curPost.editTimestamp && <div style={styles.bottomItem}>edited</div>}
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
                                                onClick={(e)=>{if(curGroup.isAdmin)highlight(reply.id)}}
                                            ></div>
                                            <div style={styles.title}>{reply.opEmail}</div>
                                            {reply.editTimestamp && <div style={{marginLeft:'0.15in',color:'rgb(46,117,182)'}}>edited</div>}
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
                                                    setPostHighlight(false)
                                                    setPage(2)
                                                }}>reply</div>
                                                {userEmail === reply.opEmail && <div style={styles.bottomItem} onClick={()=>{
                                                    setCurEdit(reply)
                                                    setPostIsPrivate(reply.private)
                                                    setPage(2)
                                                }}>edit</div>}
                                                {userEmail === reply.opEmail && <div style={styles.bottomItem}  onClick={()=>{deletePost(reply.id,true)}}>delete</div>}
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