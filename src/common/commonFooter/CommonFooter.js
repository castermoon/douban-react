import React, { Component } from "react"
import style from "./commonFooter.styl"
class CommonFooter extends Component{
	render() {
		return(
			<div className={style.footer}>
				<div className={style.footerLeft}>© 2005－2020 douban.com, all rights reserved 北京豆网科技有限公司</div>
			</div>
		)
	}
}

export default CommonFooter;
