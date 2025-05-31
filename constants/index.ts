
// import backArrow from "@/assets/icons/back-arrow.png";
// import chat from "@/assets/icons/chat.png";
// import checkmark from "@/assets/icons/check.png";
// import close from "@/assets/icons/close.png";
// import dollar from "@/assets/icons/dollar.png";
// import email from "@/assets/icons/email.png";
// import eyecross from "@/assets/icons/eyecross.png";
// import google from "@/assets/icons/google.png";
// import home from "@/assets/icons/home.png";
// import list from "@/assets/icons/list.png";
// import lock from "@/assets/icons/lock.png";
// import map from "@/assets/icons/map.png";
// import marker from "@/assets/icons/marker.png";
// import out from "@/assets/icons/out.png";
// import person from "@/assets/icons/person.png";
// import pin from "@/assets/icons/pin.png";
// import point from "@/assets/icons/point.png";
// import profile from "@/assets/icons/profile.png";
// import developer from "@/assets/icons/developer.png";
// import search from "@/assets/icons/search.png";
// import selectedMarker from "@/assets/icons/selected-marker.png";
// import star from "@/assets/icons/star.png";
// import target from "@/assets/icons/target.png";
// import to from "@/assets/icons/to.png";
// import check from "@/assets/images/check.png";
// import getStarted from "@/assets/images/get-started.png";
// import message from "@/assets/images/message.png";
// import noResult from "@/assets/images/no-result.png";
// import onboarding1 from "@/assets/images/1.png";
// import onboarding2 from "@/assets/images/3.png";
// import onboarding3 from "@/assets/images/onboarding3.png";
// import signUpCar from "@/assets/images/signup-car.png";
// --------slider---------
import Mayabilake from '@/assets/onboarding/1.jpeg';
import Modutila from '@/assets/onboarding/2.jpeg';
import Gojniobokas from '@/assets/onboarding/3.jpeg';
type ImageSource = string;

interface OnboardingItem {
  id: number;
  title: string;
  description: string;
  image: ImageSource;
}

export const images = {

  Mayabilake,
  Modutila,
  Gojniobokas,
};

// export const icons = {
//   home,
//   explore
// };

export const onboarding: OnboardingItem[] = [
  {
    id: 1,
    title: "Discover Your Unique Style",
    description: "Explore fashion that reflects your personality. Stand out with our exclusive collections.",
    image: images.Mayabilake,
  },
  {
    id: 2,
    title: "Designs That Inspire",
    description: "From streetwear to haute couture — find the inspiration to redefine your wardrobe.",
    image: images.Gojniobokas,
  },
  {
    id: 3,
    title: "Fashion Meets Comfort",
    description: "Experience the perfect blend of elegance and ease in every outfit.",
    image: images.Modutila,
  },
];

export const data = {
  onboarding,
};