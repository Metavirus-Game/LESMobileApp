import { TextInput, TouchableOpacity, Text, View } from "react-native";
import { useState } from "react";

export const ChatMessageInput = ({ onMessageSendHandler }) => {
  const [newMessage, setNewMessage] = useState("");
  const onPressHandler = () => {
    setNewMessage("");
    if (onMessageSendHandler != null && newMessage.length > 0) {
      onMessageSendHandler(newMessage);
    }
  };

  const [height, setHeight] = useState(30); // Initial height
  const maxHeight = 200;

  const handleContentSizeChange = (event) => {
    setHeight(Math.min(maxHeight, event.nativeEvent.contentSize.height));
  };

  return (
    <View className="flex-row items-end py-[10px]">
      <TextInput
        value={newMessage}
        onChangeText={(text) => setNewMessage(text)}
        className="flex-1 bg-[#1B1B1B] rounded mr-[10px] p-[5px] text-[#CACACA]"
        // onSubmitEditing={sendMessage}
        placeholderTextColor="#CACACA"
        multiline={true}
        onContentSizeChange={handleContentSizeChange}
        style={{ height: Math.max(30, height) }} // Minimum height of 30
      />
      <TouchableOpacity
        onPress={onPressHandler}
        className="bg-[#6E5EDB] p-[5px] rounded"
      >
        <Text className="text-white font-bold">Send</Text>
      </TouchableOpacity>
    </View>
  );
};
