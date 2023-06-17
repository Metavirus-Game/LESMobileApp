import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import { UserData } from "../Data/dummyData";
import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import StatusBottomSheet from "../Components/StatusBottomSheet";
import {
  StateIndicator,
  makeStateReadable,
} from "../Components/StateIndicator";
import DataCenter from "../modules/DataCenter";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

const userOptions = [
  { id: 1, title: "Account", link: "" },
  { id: 2, title: "Referral Code", link: "" },
  { id: 3, title: "Settings", link: "" },
];

const UserOptionButton = (key, title, link) => (
  <View key={key} className="py-[15px]">
    <Text className="text-white text-[15px]">{title}</Text>
  </View>
);

export default function UserScreen() {
  // const [userData, setUserData] = useState();
  const [userStatus, setUserStatus] = useState(
    DataCenter.userInfo.imUserInfo.state
  );
  // const [username, setUsername] = useState();
  // const [userId, setUserId] = useState();
  const [userInfo, setUserInfo] = useState({
    name: "",
    accountId: "",
    state: "",
    // avatar:"",
  });
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const navigation = useNavigation();

  const openSheet = () => {
    // bottomSheetRef.current?.expand(); // 1 refers to the second snap point ('50%')
    setIsSheetOpen(true);
  };

  useEffect(() => {
    // setUserStatus(DataCenter.userInfo.imUserInfo.state);
    console.log("user email: ", DataCenter.userInfo.email);
    setUserInfo((pre) => {
      return {
        ...pre,
        name: DataCenter.userInfo.imUserInfo.name,
        accountId: DataCenter.userInfo.accountId,
        // avatar:DataCenter.userInfo.accountId
      };
    });
    // setUserInfo({
    //   name: DataCenter.userInfo.imUserInfo.name,
    //   accountId: DataCenter.userInfo.accountId,
    // });
    setUserStatus(DataCenter.userInfo.imUserInfo.state);
  }, []);

  const SwitchStatusButton = () => (
    <TouchableHighlight onPress={openSheet}>
      <View className="w-[25vw] h-[5vh] bg-[#7E5ED9] rounded-lg flex-row justify-evenly items-center">
        <StateIndicator state={userStatus} />
        <Text className="text-white text-[16px] font-bold">
          {makeStateReadable(userStatus)}
        </Text>
      </View>
    </TouchableHighlight>
  );

  const onLogoutHandler = async () => {
    try {
      await deleteAuthCache();
      // (DataCenter.userInfo = {
      //   accountId: "",
      //   email: "",
      //   loginKey: "",

      //   /**
      //    * im用户信息
      //    */
      //   imUserInfo: {
      //     name: "",
      //     tag: 0,
      //     state: 0,
      //   },
      // }),
      navigation.navigate("Login");
    } catch {
      (e) => {
        console.log("log out error: ", e);
      };
    }
  };

  const navigateToNotification = () => {
    navigation.navigate("Notification");
  };

  const deleteAuthCache = async () => {
    const delAccountId = SecureStore.deleteItemAsync("accountId");
    const delLoginKey = await SecureStore.deleteItemAsync("loginKey");
    const delEmail = await SecureStore.deleteItemAsync("email");
    await Promise.all(delAccountId, delLoginKey, delEmail);
  };

  return (
    <View className="flex-1">
      <ImageBackground
        source={UserData.userBgImg}
        className="w-[100vw] h-[30vh] items-center relative"
      >
        <View className="overflow-hidden rounded-full w-[100px] h-[100px] absolute bottom-[-50px]">
          <ImageBackground
            source={{ uri: `https://i.pravatar.cc/?img=${userInfo.accountId}` }}
            className="w-[100%] h-[100%]"
            resizeMode="cover"
          />
        </View>
      </ImageBackground>
      <View className="w-[90%] mx-auto mt-[50px] items-center">
        <Text className="text-white font-bold text-[30px]">
          {userInfo.name}
        </Text>
        <Text className="text-white text-[15px]">#{userInfo.accountId}</Text>
        <View className="flex-row items-center justify-between mt-[3vh]">
          <Text className="text-white text-[20px] pr-[20px]">Set Status:</Text>
          <SwitchStatusButton />
        </View>

        <TouchableHighlight onPress={navigateToNotification}>
          <View className="bg-[#131F2B]">
            <Text className="text-white">Notifications</Text>
          </View>
        </TouchableHighlight>

        <View className="bg-[#131F2B] rounded-lg w-[100%] mt-[3vh]">
          <ScrollView className="divide-y-2 divide-[#5C5C5C] px-[10px]">
            {userOptions.map((item, index) =>
              UserOptionButton(item.id, item.title, item.link)
            )}
          </ScrollView>
        </View>
        <TouchableHighlight className="w-[100%]" onPress={onLogoutHandler}>
          <View className="bg-[#131F2B] rounded-lg w-[100%] mt-[3vh] items-center">
            <Text className="py-[10px] text-[#FF0000] text-[15px]">
              Log Out
            </Text>
          </View>
        </TouchableHighlight>
      </View>
      {/* The bottom sheet that is used to switch the user status */}
      <StatusBottomSheet
        isSheetOpen={isSheetOpen}
        setIsSheetOpen={setIsSheetOpen}
        setUserStatus={setUserStatus}
      />
    </View>
  );
}
