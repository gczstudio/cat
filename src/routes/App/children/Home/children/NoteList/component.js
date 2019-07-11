import React, { Component } from 'react'
import './component.scss'
import { Icon, Skeleton, List, Avatar } from 'antd'
import axios from 'utils/axios'
import { debounce } from 'utils/index'

const { Item } = List;

const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
);

class NoteList extends Component {
    constructor(props){
        super(props)
        this.state = {
            noteList: [],
            pageNum: 1,
            pageSize: 10,
            isNoData: false
        }
    }

    getNoteList = (pageNum)=>{
        axios.post('/notes/getNotes',{
            pageSize: 10,
            pageNum
        }).then((data)=>{
            if(data.data.length===0){
                this.setState({
                    isNoData: true
                })
            }
            this.setState((prevState)=>{
                return {
                    noteList: [...prevState.noteList, ...data.data],
                }
            })
        })
    }

    componentDidMount() {
        let { pageSize, pageNum } = this.state;
        this.getNoteList(pageNum,pageSize);
        window.onscroll = (e) => {
            if(this.state.isNoData) return;
            let bodyHeight = document.body.clientHeight,
                scrollHeight = e.currentTarget.scrollY,
                listHeight = this.listDom.offsetHeight+148;
            if((bodyHeight+scrollHeight)>=listHeight){
                this.setState((prevState)=>{
                    return {
                        pageNum: prevState.pageNum+1
                    }
                });
                debounce(this.getNoteList(this.state.pageNum,pageSize),1000);
            }
        }
    }

    render () {
        let { noteList, isNoData } = this.state;
        return (
            <div className="list-component" ref={ref => this.listDom = ref }>
                <List
                    itemLayout="vertical"
                    size="small"
                    dataSource={noteList}
                    loadMore={isNoData ? '' : <Skeleton active /> }
                    renderItem={item => (
                        <Item
                            key={item.title}
                            actions={[
                                <IconText text={item.nick_name} />,
                                <IconText type="star-o" text={item.js_meata} />,
                                <IconText type="like-o" text={item.comments} />,
                                <IconText type="message" text={item.likes} />,
                            ]}
                            extra={
                            <img
                                width={200}
                                alt="logo"
                                src={item.img_url}
                            />
                            }
                        >
                            <Item.Meta
                                title={<a href={item.detail_url}>{item.title}</a>}
                                description={item.description}
                            />
                            {item.abstract}
                        </Item>
                    )}
                />
                {
                    isNoData ? <div className="no-data">没有更多数据了哟...</div> : ''
                }
                
            </div>
        )
    }
}

export default NoteList