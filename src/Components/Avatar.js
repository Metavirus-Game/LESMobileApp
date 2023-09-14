import { View, Text } from "react-native";
import { AvatarColorPlatte } from "../../assets/AvatarColorPlatte";
import { useState, useRef, useEffect } from "react";
import { defaults } from "lodash";

const AvatarOld = ({ tag, name, isGroup }) => {
  const [fontSize, setFontSize] = useState(0);
  //const avatarRef = useRef(null);

  const colorNumber = tag ? tag % 10 : 0;
  const avatarColor = AvatarColorPlatte[colorNumber] || "#FFFFFF"; // Default color, adjust as necessary

  const initLetter = name ? name[0] : "?"; // Fallback if no name is provided

  const handleLayout = (event) => {
    const width = event.nativeEvent.layout.width;
    setFontSize(0.4 * width); // Adjust 0.4 to another fraction if desired
  };

  return (
    <View
      //ref={avatarRef}
      onLayout={handleLayout}
      className={
        isGroup
          ? "w-[100%] h-[100%] justify-center items-center rounded-xl"
          : "w-[100%] h-[100%] justify-center items-center rounded-full"
      }
      style={{ backgroundColor: avatarColor }}
    >
      <Text className="text-white font-bold" style={{ fontSize: fontSize }}>
        {initLetter}
      </Text>
    </View>
  );
};

const defaultSize = { w: 55, h: 55, font: 25 };

/**
 *
 * @param {{tag:number, name:string,isGroup:boolean,isSelected:boolean, size:{w:number,h:number,font:number}}} params
 * @returns
 */
const Avatar = ({ tag, name, isGroup, isSelected, size, children }) => {
  //const [fontSize, setFontSize] = useState(16);
  //const avatarRef = useRef(null);

  if (size == null) {
    size = defaultSize;
  }

  const initLetter = name ? name[0] : "?"; // Fallback if no name is provided

  //const colorNumber = tag ? tag % 10 : 0;
  //const avatarColor = AvatarColorPlatte[colorNumber] || "#FFFFFF"; // Default color, adjust as necessary

  //改为使用名字的第一个字母的ascii码作为color的索引
  const idx = initLetter.charCodeAt(0) % 10;
  const avatarColor = AvatarColorPlatte.bgColor[idx];

  // const handleLayout = (event) => {
  //   const width = event.nativeEvent.layout.width;
  //   setFontSize(0.4 * width); // Adjust 0.4 to another fraction if desired
  // };

  const border = " border-[#5EB857] border-4";

  let viewClass = isGroup
    ? `w-[${size.w}px] h-[${size.h}px] justify-center items-center rounded-xl absolute left-0 top-0`
    : `w-[${size.w}px] h-[${size.h}px] justify-center items-center rounded-full absolute left-0 top-0`;

  let borderClass = isGroup
    ? `w-[${size.w}px] h-[${size.h}px] justify-center items-center rounded-xl ${border} absolute left-0 top-0`
    : `w-[${size.w}px] h-[${size.h}px] justify-center items-center rounded-full ${border} absolute left-0 top-0`;

  borderClass += isSelected ? " opacity-80" : " hidden";

  // const fontClass = "text-white font-bold text-[" + size.font + "px]";
  const fontClass =
    idx <= 4
      ? `text-[${AvatarColorPlatte.textColor.dark}] font-bold text-[${size.font}px]`
      : `text-[${AvatarColorPlatte.textColor.light}] font-bold text-[${size.font}px]`;

  return (
    <View className={`absolute w-[${size.w}px] h-[${size.h}px]`}>
      <View
        //ref={avatarRef}
        //onLayout={handleLayout}
        className={viewClass}
        style={{ backgroundColor: avatarColor }}
      >
        <Text
          className={fontClass}
          style={{ fontSize: size.font }}
          style={{ fontSize: size.font }}
        >
          {initLetter}
        </Text>
      </View>
      <View className={borderClass}></View>
      {children}
    </View>
  );
};
export default Avatar;
