import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Account() {
    const navigate=useNavigate();
    let groups=[
        {
            id:0,
            name:'Group One',
            owner:'ntmthien01@gmail.com'
        },
        {
            id:1,
            name:'Group Two',
            owner:'ntmthien2001@gmail.com'
        },
        {
            id:2,
            name:'Group Three',
            owner:'ntmthien01@gmail.com'
        },
        {
            id:3,
            name:'Group Four',
            owner:'ntmthien01@gmail.com'
        },
        {
            id:4,
            name:'Group Five',
            owner:'ntmthien2001@gmail.com'
        },
        {
            id:5,
            name:'Group Six',
            owner:'ntmthien2001@gmail.com'
        },
        {
            id:6,
            name:'Group Seven',
            owner:'ntmthien2001@gmail.com'
        },
        {
            id:7,
            name:'Group Eight',
            owner:'ntmthien01@gmail.com'
        },
        {
            id:8,
            name:'Group Nine',
            owner:'ntmthien2001@gmail.com'
        },
        {
            id:9,
            name:'Group Ten',
            owner:'ntmthien2001@gmail.com'
        },
        {
            id:10,
            name:'Group Eleven',
            owner:'ntmthien01@gmail.com'
        },
        {
            id:11,
            name:'Group Twelve',
            owner:'ntmthien01@gmail.com'
        },
        {
            id:12,
            name:'Group Thirteen',
            owner:'ntmthien2001@gmail.com'
        },
        {
            id:13,
            name:'Group Fourteen',
            owner:'ntmthien2001@gmail.com'
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
                    <img style={styles.tool} src={require('../assets/add.png')} onClick={()=>{navigate("../group/edit")}} alt='logo'></img> 
                </div>
                <div style={styles.groupList}>
                    {groups.map((group,index)=>(
                        <div style={styles.row}>
                            <div style={styles.rowItem} onClick={()=>{navigate("../group")}}>{group.name}</div>
                            <div>X</div>
                        </div>
                    ))}
                </div>
            </div>
            <div style={styles.account}>
                <img style={styles.picture} src={require('../assets/picture.png')} alt='logo'></img> 
                <div style={styles.email}>ntmthien01@gmail.com</div>
                <div style={styles.button}  onClick={()=>{navigate("..")}}>sign out</div>
            </div>
        </div>
    );
}

export default Account;