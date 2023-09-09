import { View, Text, TextInput, Modal } from "react-native";
import InputLayout from "../Components/InputLayout";
import { useEffect, useState } from "react";
import AuthButton from "../Components/AuthButton";
import IMFunctions from "../utils/IMFunctions";
import { useNavigation } from "@react-navigation/native";
import { LesPlatformCenter } from "les-im-components";
import LoadingIndicator from "../Components/LoadingIndicator";
import AuthFormInput from "../Components/AuthForm/AuthFormInput";
import HighlightButton from "../Components/HighlightButton";
import FeedBackModal from "../Components/FeedbackModal";

export default function CreateNameScreen() {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [feedback, setFeedbak] = useState();
  const [isValidated, setIsValidated] = useState(false);

  const navigation = useNavigation();

  const updateUsername = (val) => {
    setUsername(val);
  };

  const hasSpecialCharacters = (str) => {
    const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    return regex.test(str);
  };

  const doublecheckHandler = () => {
    if (hasSpecialCharacters(username)) {
      setFeedbackModalOpen(true);
      setFeedbak("Name can not contain any special characters");
      setIsValidated(false);
      return;
    }
    setFeedbackModalOpen(true);
    setFeedbak("You can not change the nickname once it has been created!");
    setIsValidated(true);
  };

  const setNameHandler = () => {
    setIsLoading(true);
    LesPlatformCenter.IMFunctions.setName(username)
      .then((res) => {
        console.log("name create success: ", res);
        navigation.navigate("BottomTab");
        setFeedbackModalOpen(false);
      })
      .catch((e) => {
        setFeedbackModalOpen(true);
        setFeedbak(e);
        console.log("set name error: ", e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <View className="flex-1 justify-center">
      <View className="bg-[#2A2C37] p-[20px]">
        <Text className="text-white text-[18px] font-bold">
          Create your nickname
        </Text>
        <View className="mt-[20px]">
          <AuthFormInput value={username} onChangeHandler={updateUsername} />
        </View>
        <View className="items-center mt-[20px]">
          <HighlightButton
            type={"primary"}
            text={"Submit"}
            isLoading={isLoading}
            disabled={isLoading || !username.length}
            onPress={doublecheckHandler}
          />
        </View>
        {/* <LoadingIndicator isLoading={isLoading} /> */}
      </View>
      <FeedBackModal
        feedbackModalOpen={feedbackModalOpen}
        feedback={feedback}
        setFeedbackModalOpen={setFeedbackModalOpen}
      >
        {isValidated && (
          <HighlightButton
            type={"primary"}
            text={"Ok"}
            onPress={setNameHandler}
            isLoading={isLoading}
            disabled={isLoading}
          />
        )}
      </FeedBackModal>
    </View>
  );
}
