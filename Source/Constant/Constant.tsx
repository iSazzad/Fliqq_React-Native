import { Image } from "react-native-svg";
import { useAuth } from "./AuthContext";
import {Dimensions} from 'react-native';
import Images from "./Images";

const auth = useAuth()

export const CharacterImageName = () => {
  let first =  auth.authData?.first_name?.charAt(0)
  let last = auth.authData?.last_name?.charAt(0)
  
  console.log("first name: ", first, "last : ", last)
  return (first! + last!).toUpperCase()
}

export function isPortrait() {
  const dim = Dimensions.get("screen")
  return dim.height >= dim.width
}

export function isLandscape() {
  const dim = Dimensions.get("screen")
  return dim.width >= dim.height
}

export const imageArry = [
  {
    id : 1,
    image : Images.A,
  },
  {
    id : 2,
    image : Images.B,
  },
  {
    id : 3,
    image : Images.C,
  },
  {
    id : 4,
    image : Images.D,
  },
  {
    id : 5,
    image : Images.E,
  },
  {
    id : 6,
    image : Images.F,
  },
  {
    id : 7,
    image : Images.G,
  },
  {
    id : 8,
    image : Images.H,
  },
  {
    id : 9,
    image : Images.I,
  },
  {
    id : 10,
    image : Images.J,
  },
  {
    id : 11,
    image : Images.K,
  },
  {
    id : 12,
    image : Images.L,
  },
  {
    id : 13,
    image : Images.M,
  },
  {
    id : 14,
    image : Images.N,
  },
  {
    id : 15,
    image : Images.O,
  },
  {
    id : 16,
    image : Images.P,
  },
  {
    id : 17,
    image : Images.Q,
  },
  {
    id : 18,
    image : Images.R,
  },
  {
    id : 19,
    image : Images.S,
  },
  {
    id : 20,
    image : Images.T,
  },
  {
    id : 21,
    image : Images.U,
  },
  {
    id : 22,
    image : Images.V,
  },
  {
    id : 23,
    image : Images.W,
  },
  {
    id : 24,
    image : Images.X,
  },
  {
    id : 25,
    image : Images.Y,
  },
  {
    id : 26,
    image : Images.Z,
  }
]