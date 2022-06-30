import React, { Fragment } from "react"
import { useLocation } from "react-router-dom"
import CommonHeader from "../../common/commonHeader/CommonHeader";
import BaseBody from "../../common/baseBody/BaseBody";
import CommonFooter from "../../common/commonFooter/CommonFooter";




const Page404:React.FC = () => {

    let location = useLocation();

    return (
        <Fragment>
            <CommonHeader />
            <BaseBody
                left={
                    <div>页面{location.pathname}没有找到</div>
                }
            />
            <CommonFooter/>
        </Fragment>
    )
}




export default Page404;
