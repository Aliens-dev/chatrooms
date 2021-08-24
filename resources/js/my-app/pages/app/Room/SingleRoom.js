import React, {useContext, useRef, useState,useEffect} from 'react';
import axios from 'axios';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import {BreadCrumb,Loading} from "../../../components";
import {DASHBOARD_PAGE, ROOMS_PAGE, ROOMS_PAGE_API} from "../../../urls/AppBaseUrl";
import MessageUsers from "./MessageUsers";
import {Link, Redirect, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {GET_MESSAGES_ACTION} from "../../../actions/MessagesActions";
import { GET_ROOM_ACTION, REMOVE_ROOM_ACTION } from '../../../actions/roomsActions';

const SingleRoom = props => {
    /*
    const [room, setRoom] = useState({});
    const [myEcho,setMyEcho] = useState(null)
    */
    // Active Users
    /*
    const [activeUsers,setActiveUsers] = useState([]);
    const [joinedUser,setJoinedUser] = useState([]);
    const [leavingUser,setLeavingUser] = useState([]);
    */
    // messages
    /*
    const [message,setMessage] = useState('');
    const [messages,setMessages] = useState([]);
    const [userWriting,setUserWriting] = useState('');
    const [isTyping,setIsTyping] = useState(false);
    const [socketMessage,setSocketMessage] = useState(null);
    const {auth} = useContext(AppContext);
    const [loading,setLoading] = useState(true);
    */
    /*
    useEffect(()=> {
        setActiveUsers([...activeUsers, joinedUser]);
    },[joinedUser]);
    useEffect(()=> {
        let filter = activeUsers.filter(user => user.id !== leavingUser.id)
        setActiveUsers(filter);
    },[leavingUser]);
    useEffect(() => {
        if(isTyping) {
            setTimeout(() => {
                setUserWriting('')
                clearTimeout(this)
                setIsTyping(false)
            },3000)
        }
    },[isTyping])
    */
    // On Component Mount :
    /*
    useEffect(() => {
        getRoom();
        const echo = new Echo({
            broadcaster: 'pusher',
            key: 'd8b949bfb89e354b3e51',
            cluster: 'eu',
            forceTLS: false,
            auth: {
                headers: {
                    Authorization : "Bearer " + auth.token,
                },
            },
        });
        setMyEcho(echo)
    }, []);
    useEffect(() => {
        if(myEcho) {
            myEcho
                .join('room.'+ props.match.params.id)
                .listen('UserSendMessageEvent', (e) => {
                    setSocketMessage(e.data);
                })
                .here(users => {
                    setActiveUsers(users);
                })
                .joining(user => {
                    setJoinedUser(user);
                })
                .leaving(user => {
                    setLeavingUser(user)
                })
                .listenForWhisper('typing', (e) => {
                    setIsTyping(true);
                    setUserWriting(e.name  + ' is Typing ...')
                });
        }
    }, [myEcho])
    */
    /*
    const userTyping = (e) => {
        setMessage(e.target.value)
        myEcho
            .join('room.'+ props.match.params.id)
            .whisper('typing', {
                name: auth.user.name
            });
    }
    */
    /*
    useEffect(() => {
        if(socketMessage) {
            setMessages([...messages,socketMessage]);
        }
    }, [socketMessage])
    */
    /*
    const sendMessage = (e) => {
        e.preventDefault();
        if(message === '') {
            return;
        }
        axios({
            url:ROOMS_PAGE_API+props.match.params.id+'/messages',
            method:'POST',
            data: {
                message,
            },
            headers : {
                authorization : 'bearer '+ auth.token,
            }
        })
            .then(res=> {
                setMessage('');
                setMessages([...messages,res.data.data]);
            })
            .catch(err => {

            })
    }
    */

    const dispatch = useDispatch();
    const room = useSelector(state => state.rooms.singleRoom)
    const singleRoomLoading = useSelector(state => state.rooms.singleRoomLoading)
    const { loading, messages } = useSelector(state => state.messages)
    const { user } = useSelector(state => state.auth.user)
    const { id } = useParams()

    useEffect(() => {
        dispatch(GET_ROOM_ACTION(id))
        dispatch(GET_MESSAGES_ACTION(id))
    }, [])

    const deleteRoom = () => {
        dispatch(REMOVE_ROOM_ACTION(id))
    }

    const renderMessages = () => {
        return messages.map(message => {
            if(message.sender_id === user.id) {
                return (
                    <div className="room-message-box" key={message.id}>
                        <div className="room-message-right-box">
                            <span>{message.message}</span>
                        </div>
                    </div>
                )
            }else{
                return (
                    <div className="room-message-box" key={message.id}>
                        <div className="room-message-left-box">
                            <span>{message.message}</span>
                        </div>
                    </div>
                )
            }
        });
    }
    
    if(singleRoomLoading) {
        return (
            <Loading>
                <Loading.Large />
            </Loading>
        )
    }
    
    if(! room) {
        return <Redirect to={ROOMS_PAGE} />
    }
    return (
        <div className="single-room" >
            <BreadCrumb>
                <BreadCrumb.Item url={DASHBOARD_PAGE}>
                    Dashboard
                </BreadCrumb.Item>
                <BreadCrumb.Item url={ROOMS_PAGE}>
                    Public rooms
                </BreadCrumb.Item>
                <BreadCrumb.Active>
                    { room.name }
                </BreadCrumb.Active>
            </BreadCrumb>
            <div className="room-section" >
                {
                    <MessageUsers id={id} /*activeUsers={activeUsers}*/ />
                }
                <div className="room-messages">
                    <div className="room-info">
                        <div className="room-image">
                            <img src={`/uploads/room-img`} />
                        </div>
                        <div className="room-name">
                            <span>
                                { room.name }
                            </span>
                        </div>
                        <div className="d-flex flex-grow-1"></div>
                        <div className="dropleft">
                            <i className="fa fa-ellipsis-h"
                               data-toggle="dropdown"
                               aria-haspopup="true"
                               aria-expanded="false"
                            />
                            <div className="dropdown-menu">
                                <Link to={ROOMS_PAGE+id+'/edit'} className="dropdown-item">Edit</Link>
                                <div onClick={deleteRoom} className="dropdown-item">Delete</div>
                            </div>
                        </div>
                    </div>
                    <div className="room-message-container">
                        {
                            loading ?
                                <Loading>
                                    <Loading.Large color={"#00F"} />
                                </Loading>
                                :
                                renderMessages()
                        }
                        <div className="message-typing">
                            {
                                //userWriting
                            }
                        </div>
                    </div>
                    <form className="room-message-input" /*onSubmit={sendMessage}*/>
                        <input
                            //value={message}
                            //onChange={userTyping}
                            placeholder="Write a message ..."
                        />
                        <div className="send"
                             //onClick={sendMessage}
                        >
                            <i className="fa fa-paper-plane"/>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}
export default SingleRoom;
