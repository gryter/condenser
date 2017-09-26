import React from 'react';
import { Link } from 'react-router'
import tt from 'counterpart'
import Userpic from 'app/components/elements/Userpic'
import TimeAgoWrapper from 'app/components/elements/TimeAgoWrapper'

export default class NotificationPostReply extends React.Component {

    render() {
        //const author = authors[Math.floor(Math.random() * authors.length)]
        const author = this.props.author
        const post = this.props.rootItem
        const comment = this.props.item
        const created = this.props.created
        const classNames = (this.props.read)? '' : 'unread'
        var link = ['', comment.category, '@' + comment.author, comment.permlink].join('/')
        var actionText = tt("notifications.vote.actionPost")
        if(0 < comment.depth) {
            link = ['', post.category, '@' + post.author, post.permlink, '#@' + comment.author, comment.permlink].join('/')
            actionText = tt("notifications.vote.actionComment")
        }

        return <Link href={ link } className={ classNames }>
            <div className="item-panel" >
                <div className="Comment__Userpic show-for-medium">
                    <Userpic account={ author } />
                </div>
                <div className="item-header">
                    <span className="user">{ author }</span> { actionText }
                </div>
                <div className="item-content" >
                    { comment.summary }
                </div>
                <div className="item-footer">
                    <TimeAgoWrapper date={created} className="updated" />
                </div>
            </div>
        </Link>
    }
}