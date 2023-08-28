import { Text, View } from "react-native";
import ChatListBar from "../Components/Chat/ChatListBar";
import { MessagePanel, MessageTitle } from "../Components/Chat/MessagePanel";
import { useEffect, useRef, useState } from "react";
import { ChatData, ChatListItem } from "../Models/MessageCaches";
import DataCenter from "../modules/DataCenter";
import { ChatMessageInput } from "../Components/ChatMessageInput";
import LoginService from "../services/LoginService";
import { LesConstants } from "les-im-components";
import MessageService from "../services/MessageService";
import ChatSearchBottomSheet from "../Components/SearchBottomSheet";

const ChatScreenV2 = () => {
    const [currChatItem, setCurrChatItem] = useState({ item: null, focusMessageId: null });
    const [currChatData, setCurrChatData] = useState(null);

    const onChatListItemSelected = (item, focusMessageId) => {
        setCurrChatItem({ item, focusMessageId });
    }

    // useEffect(() => {

    // }, []);

    const onMessageSendHandler = (newMessage) => {
        if (currChatData.type === LesConstants.IMMessageType.Single) {
            MessageService.Inst.sendMessage(currChatData.targetId, newMessage);
        } else {
            MessageService.Inst.sendChatGroupMessage(currChatData.targetId, newMessage);
        }
    };

    useEffect(() => {
        const chatData = DataCenter.messageCache.getChatDataByChatId(currChatItem.item?.chatId ?? "", true)
        setCurrChatData(chatData);
    }, [currChatItem]);

    return (
        <View className="flex-1 flex-row pt-[5vh]" >
            {/* 左侧边栏 */}
            <View className="w-[80px] items-center flex-col">
                <ChatListBar
                    onItemSelected={onChatListItemSelected}
                />
            </View>
            {/* 右侧聊天区域 */}
            <View className="flex-1 bg-[#262F38] rounded-lg pl-2 pr-2">
                {/* 聊天框标题 */}
                <MessageTitle
                    chatObj={currChatData}
                />
                {/* 聊天面板 */}
                <MessagePanel
                    chatData={currChatData}
                    focusMessaageId={currChatItem?.focusMessageId ?? null}
                />
                {/* 文字输入框 */}
                <ChatMessageInput onMessageSendHandler={onMessageSendHandler} />
            </View>
        </View>
    )
}

export default ChatScreenV2;