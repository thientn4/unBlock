import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Account() {
    const navigate=useNavigate();
    let groups=['rqwrwfdsasfdsafdsasadgsdaffasffdsaf',2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]
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
                    <img style={styles.tool} src={require('../assets/add.png')} alt='logo'></img> 
                </div>
                <div style={styles.groupList}>
                    {groups.map((group,index)=>(
                        <div style={styles.row}>
                            <div style={styles.rowItem}>{group}</div>
                            <div>X</div>
                        </div>
                    ))}
                </div>
            </div>
            <div style={styles.account}>
                <img style={styles.picture} src={require('../assets/picture.png')} alt='logo'></img> 
                <div style={styles.email}>ntmthien01@gmail.com</div>
                <div style={styles.button}>sign out</div>
            </div>
        </div>
    );
}

export default Account;