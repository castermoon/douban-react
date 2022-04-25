import React, {Component} from "react"

class CommonTopHeader extends Component {
	render() {
		return (
			<div className="Common-Top-header">
				<ul className="header-left">
					<li className="header-link"><a href="#">豆瓣</a></li>
					<li className="header-link"><a href="#">读书</a></li>
					<li className="header-link"><a href="#">电影</a></li>
					<li className="header-link"><a href="#">音乐</a></li>
					<li className="header-link"><a href="#">同城</a></li>
					<li className="header-link"><a href="#">小组</a></li>
					<li className="header-link"><a href="#">阅读</a></li>
					<li className="header-link"><a href="#">FM</a></li>
				</ul>
				<div className="header-right">
					<div className="drop-down-menu">
						<a className="drop-down-menu-btn">的账号</a>
						<ul className="drop-down-menu-list">
							<li className="drop-down-menu-item">
								<router-link>个人主页</router-link>
							</li>
							<li className="drop-down-menu-item">退出</li>
						</ul>
					</div>
				</div>
			</div>
		)
	}
}

export default CommonTopHeader;
