import React, { Fragment,useState, useEffect } from "react"
import style from "./login.styl"
import axios from "axios"
import {Link,useNavigate } from "react-router-dom"
import CommonTopHeader from "../../common/commonTopHeader/CommonTopHeader";
import store from "../../store";

const Login:React.FC = () => {
	let navigate = useNavigate()

	const [tabShow, setTabShow] = useState(1);
	const [submitActive, setSubmitActive] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [registerName, setRegisterName] = useState("");
	const [registerPassword, setRegisterPassword] = useState("");

	//getData
	useEffect(()=>{
		if((username && password) || (registerName && registerPassword)){
			setSubmitActive(true)
		}else {
			setSubmitActive(false)
		}
	},[username, password,registerName,registerPassword])

	return(
		<Fragment>
			<CommonTopHeader/>
			<div className={style.header}>
				<div className={style.nav}>
					<Link to={"/"}  className={style.img_wrapper}>
						<img src="https://img3.doubanio.com/f/accounts/4fd84763a74089b20eb02ba0225d6e7739d2c432/passport/pics/douban_logo@2x.png" width="142"/>
					</Link>
				</div>
			</div>
			<div className={style.login_container}>
				<div className={style.account_tab}>
					<div className={[style.tab_header_item,0 === tabShow ? style.isActive: ""].join(" ")} onClick={() => { switchTab(0) }}>注册</div>
					<div className={[style.tab_header_item,1 === tabShow ? style.isActive: ""].join(" ")} onClick={() => { switchTab(1) }}>密码登录</div>
				</div>
				<div className={style.account_tab_body}>
					<div className={[style.account_tab_body_item,tabShow === 0 ? style.isActive: ""].join(" ")}>
						<input className={style.username} type="text" onChange={registerNameInputChange} value={registerName} placeholder="账号"/>
						<input className={style.password} type="password" onChange={registerPasswordInputChange} value={registerPassword} placeholder="密码"/>
						<input className={[style.submit,submitActive ? style.isActive : ""].join(" ")} onClick={registerClick} type="submit" value="注册账号"/>
					</div>
					<div className={[style.account_tab_body_item,tabShow === 1 ? style.isActive : ""].join(" ")}>
						<input className={style.username} type="text" onChange={usernameInputChange} value={username} placeholder="账号"/>
						<input className={style.password} type="password" onChange={passwordInputChange} value={password} placeholder="密码"/>
						<input className={[style.submit,submitActive ? style.isActive: ""].join(" ")} onClick={loginClick} type="submit" value="登录豆瓣"/>
					</div>
				</div>
			</div>
		</Fragment>
	)

	function switchTab(index:number){
		setTabShow(index)
		setUsername("")
		setPassword("")
		setRegisterName("")
		setRegisterPassword("")
	}

	function loginClick():void{
		axios.post('/api/user/login',{
			username:username,
			password:password
		})
			.then(loginSucc)
			.catch((err)=>{
				console.log(err)
			})
	}

	function loginSucc(res:any){
		if(!res.data.data){
			return
		}
		const action = {
			type:"change_user_info",
			value:res.data.data
		}
		store.dispatch(action)
		navigate(`/personal/${res.data.data.id}`)
	}

	function registerClick(){
		axios.post('/api/user/register',{
			username:registerName,
			password:registerPassword
		})
			.then(registerSucc)
			.catch((err)=>{
				console.log(err)
			})
	}

	function registerSucc(res:any){
		if(res.data.errno === 0){
			alert("注册成功")
			navigate(`/personal/${res.data.data.id}`)
		}else {
			alert(res.data.message)
		}
	}

	function usernameInputChange(e: React.ChangeEvent<HTMLInputElement>){
		const value = e.target.value
		setUsername(value)
	}

	function registerNameInputChange(e: React.ChangeEvent<HTMLInputElement>){
		const value = e.target.value
		setRegisterName(value)
	}

	function passwordInputChange(e:React.ChangeEvent<HTMLInputElement>){
		const value = e.target.value
		setPassword(value)
	}

	function registerPasswordInputChange(e:React.ChangeEvent<HTMLInputElement>){
		const value = e.target.value
		setRegisterPassword(value)
	}
}



export default Login;
