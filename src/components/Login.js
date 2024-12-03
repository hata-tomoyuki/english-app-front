import React, { useReducer } from "react";

import { withCookies } from "react-cookie";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/system";  // styled or makeStyles
// import { makeStyles } from '@mui/styles';
// import { backdropClasses } from "@mui/material";

import API_URL from '../config';

import { START_FETCH,FETCH_SUCCESS,ERROR_CATCHED,INPUT_EDIT_LOG,INPUT_EDIT_REG,TOGGLE_MODE } from "./actionTypes"; 


const useStyles = styled((theme)=>({
    // textfield: {
    //     input: { color: '#999999' }, // 入力文字の色とサイズ
    //     label: { color: 'rgba(255, 255, 255, 0.7)' }, // ラベルの色
    //     '& .MuiOutlinedInput-root': {
    //         '& fieldset': {
    //             borderColor: 'gray', // 非アクティブ時の枠の色
    //         },},
    // }, 

    paper:{
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center',
    },
    avatar:{
        margin:theme.spacing(1),
        backgroundColor:theme.palette.secondary.main,
    },
    form:{
        width:'100%',
        marginTop: theme.spacing(1),
    },
    submit:{
        margin:theme.spacing(3,0,2),
    },
    span:{
        display:'flex',
        flexDirection:'column',
        alignItems: 'center',
        color: 'fuchsia',
        marginTop:10,
    },
}));

const initialState={
    isLoading: false,
    isLoginView: true,
    error: '',
    credentialsLog:{ //ログイン用の認証情報
        username: '',
        password: '',
    },
    credentialsReg:{ //新規登録用の認証情報
        username: '',
        password: ''
    }
}

const loginReducer = (state, action)=>{
    switch(action.type){
        case START_FETCH:{
            return{
                ...state,
                isLoading:true,
            }
        }
        case FETCH_SUCCESS:{
            return{
                ...state,
                isLoading:false,
            }
        }
        case ERROR_CATCHED:{
            return{
                ...state,
                error: 'username or password is not correct!',
                isLoading:false,
            }
        }
        case INPUT_EDIT_LOG: {
            return {
              ...state,
              //[action.inputName]: action.payload,
              credentialsLog: {
                ...state.credentialsLog,
                [action.inputName]: action.payload,
              },
              error: "",
            };
          }
        case INPUT_EDIT_REG: {
            return {
              ...state,
              //[action.inputName]: action.payload,
              credentialsReg: {
                ...state.credentialsReg,
                [action.inputName]: action.payload,
              },
              error: "",
            };
          }

        case TOGGLE_MODE:{
            return {
                ...state,
                isLoginView: !state.isLoginView,
            }
        }
        default:
            return state;
    }
}

const Login = (props) => {
    // 現状のpropsは空のオブジェクトだが、後から追加する場合を想定して引数にprops。

    const classes = useStyles();
    const [state,dispatch] = useReducer(loginReducer,initialState);

    const inputChangedLog = () => event =>{
        // const cred = state.credentialsLog;
        // cred[event.target.name] = event.target.value;
        dispatch({
            type: INPUT_EDIT_LOG,
            // inputName: 'state.credentialLog',
            // payload: cred,
            inputName: event.target.name,
            payload: event.target.value,
        })
    }

    const inputChangedReg = () => event =>{
        // const cred = state.credentialsReg;
        // cred[event.target.name] = event.target.value;
        dispatch({
            type: INPUT_EDIT_REG,
            // inputName: 'state.credentialReg',
            // payload: cred,
            inputName: event.target.name,
            payload: event.target.value,
        })
    }

    const login = async(event)=>{
        event.preventDefault()
        if(state.isLoginView){
          try{
                dispatch({type:START_FETCH})
                // const res = await axios.post(`${API_URL}/authen/`,state.credentialsLog,{
                const res = await axios.post(`/authen/`,state.credentialsLog,{
                headers:{'content-type':'application/json',
                        'X-CSRFToken':document.cookie.match(/csrftoken=([^;]*)/)?.[1]
                }})

                props.cookies.set('current-token',res.data.token)
                props.cookies.set("username", res.data.username, { path: "/" });

                localStorage.setItem('current-token', res.data.token);
                localStorage.setItem('username', res.data.username);

                res.data.token ? window.location.href = "/main" : window.location.href="/"
                dispatch({type: FETCH_SUCCESS})

                
          } catch(error) {
            console.error("Error during authentication:", error);
            dispatch({type:ERROR_CATCHED})
        }
        }else{
            try{
                dispatch({type:START_FETCH})
                await axios.post(`${API_URL}/api_user/create/`, state.credentialsReg,{
                headers:{'content-type':'application/json',
                    'X-CSRFToken':document.cookie.match(/csrftoken=([^;]*)/)?.[1]
                }})
                dispatch({type: FETCH_SUCCESS})
                dispatch({type: TOGGLE_MODE}) 
            } catch(error) {
            console.error("Error during authentication:", error);
            dispatch({type:ERROR_CATCHED})
            }
        }
    }

    const toggleView =()=> {
        dispatch({type:TOGGLE_MODE})
    }

    const textFieldStyle = {
            input: { color: '#999999' }, // 入力文字の色とサイズ
            label: { color: 'rgba(255, 255, 255, 0.7)' }, // ラベルの色
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'gray', // 非アクティブ時の枠の色
                },
              },
          }

  return (
    <>

    <div style={{
    backgroundImage: 'url("/images/login_background2.webp")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    color: '#d0d0d0',
    }}>
    {/* material-uiのsign-inを参照 */}

    <Container maxWidth='xs'> 
    <Typography variant='h5'>Ebing House Note Application</Typography>
        <form onSubmit={login} style={{marginTop: '20px'}}>


            <div className ={classes.paper}>

            {state.isLoading && <CircularProgress />}
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography variant='h6'>
                {state.isLoginView ? 'Login':'Register'}
            </Typography>

        {state.isLoginView ? 
          <TextField
            variant="outlined" margin="normal"
            fullWidth label = "username"
            name = "username"
            value={state.credentialsLog.username}
            onChange={inputChangedLog()}
            autoFocus
            sx={textFieldStyle}
            
            />:
            <TextField
            variant="outlined" margin="normal"
            fullWidth label = "username"
            name = "username"
            value={state.credentialsReg.username}
            onChange={inputChangedReg()}
            autoFocus
            sx={textFieldStyle}/>
        }

        {state.isLoginView ? 
          <TextField
            variant="outlined" margin="normal"
            fullWidth label = "Password"
            name = "password"
            type = "password"
            value={state.credentialsLog.password}
            onChange={inputChangedLog()}
            sx={textFieldStyle}/>:
          <TextField
            variant="outlined" margin="normal"
            fullWidth label = "Password"
            name = "password"
            type = "password"
            value={state.credentialsReg.password}
            onChange={inputChangedReg()}
            sx={textFieldStyle}/>
        }
        <span className={classes.spanError}>{state.error}</span>

        {  state.isLoginView ?
           !state.credentialsLog.password || !state.credentialsLog.username ?
           <Button className={classes.submit} type='submit' fullWidth disabled variant="contained" color='primary'>Login</Button>
           : <Button className={classes.submit} type='submit' fullWidth variant="contained" color='primary'>Login</Button>
          :
           !state.credentialsReg.password || !state.credentialsReg.username ?
           <Button className={classes.submit} type='submit' fullWidth disabled variant="contained" color='primary'>Register</Button>
           : <Button className={classes.submit} type='submit' fullWidth variant="contained" color='primary'>Register</Button>
        }

        <span onClick={()=>toggleView()} className={classes.span}>
            {state.isLoginView ? 'Create Account ?' : 'Back to login ?'}
        </span>
        </div>

        </form>


    </Container>
    </div>
    </>
  )
}

export default withCookies(Login)
