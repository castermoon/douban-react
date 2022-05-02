<template>
  <div @click.self="respondInputHide">
    <common-header></common-header>
    <base-body :title="longCommentDetail.title">
      <template slot="base-body-left">
        <div class="long-comment-body">
          <div class="long-comment-header">
            <img class="icon" src="https://images.weserv.nl/?url=https://img2.doubanio.com/icon/u155190344-21.jpg">
            <div class="name"><a href="#">{ longCommentDetail.nickName }</a></div>
            <div class="star-wrapper"><star :score="longCommentDetail.score"></star></div>
            <div class="date">{longCommentDetail.date | timestampChange }</div>
          </div>
          <div class="Spoiler" >| 这篇影评可能有剧透</div>
          <p class="long-comment-content" v-html="longCommentDetail.content">
          </p>
          <div class="copyright">
            © 本文版权归作者&nbsp;{ longCommentDetail.nickName }&nbsp;所有，任何形式转载请联系作者。
          </div>
        </div>
        <ul class="respond-list" ref="respondList">
          <li class="respond-item" v-for="(item,index) of longCommentDetailRes" :key="item.id" ref="respondItemList">
            <div class="respond-item-left">
              <img class="respond-item-icon" src="https://img2.doubanio.com/icon/up208248294-1.jpg">
            </div>
            <div class="respond-item-right">
              <div class="respond-user-info">
                <a  href="#" class="respond-user-name">{ item.firstRes_name }</a>
                <div class="respond-date">{ item.firstRes_date | timestampChange }</div>
              </div>
              <div class="respond-content">{item.firstRes_content}</div>
              <div class="respond-item-right-bottom" >
                <span @click="respondInputShow(item)">回应</span>
              </div>
              <div class="respond-input-container" v-if="item.respondInputIsShow">
                <input class="respondInput" v-model="resResInputContent"/>
                <button class="respond-btn" @click="createResRes(item.id,item.firstRes_userId,index)">加上去</button>
              </div>
              <ul class="resRes-list">
                <li class="resRes-item" v-for="secondResItem of item.secondResList" key={secondResItem.id}>
                  <div class="resRes-item-left">
                    <img class="resRes-item-icon" src="https://img2.doubanio.com/icon/up208248294-1.jpg">
                  </div>
                  <div class="resRes-item-right">
                    <div class="resRes-user-info">
                      <a  href="#" class="resRes-user-name">{ secondResItem.secondRes_name }</a>
                      <div class="resRes-date">{ secondResItem.secondRes_date  }</div>
                    </div>
                    <div class="resRes-content"><a href="." class="resRes-name">@{secondResItem.secondRes_respond_name}</a>{ secondResItem.secondRes_content }</div>
                    <div class="resRes-item-right-bottom" >
                      <span @click="respondInputShow(secondResItem)">回应</span>
                    </div>
                    <div class="respond-input-container" v-if="secondResItem.respondInputIsShow">
                      <input class="respondInput" v-model="resResInputContent"/>
                      <button class="respond-btn" @click="createResRes(item.id,secondResItem.secondRes_userId,index)">加上去</button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <div class="my-respond">
          <div class="my-respond-left">
            <img class="my-respond-icon" src="https://images.weserv.nl/?url=https://img2.doubanio.com/icon/u155190344-21.jpg"/>
          </div>
          <textarea class="my-respond-input" placeholder="添加回应" v-model="myRespondInputContent"/>
        </div>
        <button class="my-respond-btn" @click="createMyRespond">加上去</button>
      </template>
      <template slot="base-body-right">
        <common-movie-data :CommentsMovieData="CommentsMovieData"></common-movie-data>
      </template>
    </base-body>
    <common-footer></common-footer>
  </div>
</template>
