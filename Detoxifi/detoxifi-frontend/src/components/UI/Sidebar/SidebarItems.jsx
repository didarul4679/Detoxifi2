import stressorsIcon from "../../../assets/icons/s1.png";
import detoxIcon from "../../../assets/icons/d1.png";
import fastingIcon from "../../../assets/icons/f1.png";
import dietIcon from "../../../assets/icons/d2.png";
import biohackingIcon from "../../../assets/icons/b1.png";
import coachingIcon from "../../../assets/icons/c1.png";
import communityIcon from "../../../assets/icons/c2.png";
import storeIcon from "../../../assets/icons/s2.png";
import ActiveLink from "../../utils/ActiveLink";

const SidebarItems = () => {
  return (
    <div
      className="mt-5 md:mt-7 flex flex-col gap-3"
      style={{
        textEdge: "cap",
        leadingTrim: "both",
        fontFamily: "PP Neue Montreal",
        fontWeight: 500,
        fontStyle: "normal",
      }}
    >
      <ActiveLink to="/dashboard/stressors" className="text-white ">
        <img
          src={stressorsIcon}
          alt="Stressors"
          className="h-[18px] md:h-[20px] w-[18px]"
        />
        <span>Stressors</span>
      </ActiveLink>

      {/* <ActiveLink to="/dashboard/detox" className="text-white">
        <img src={detoxIcon} alt="Detox" className="h-[20px] w-[22px]" />
        <span>Detox</span>
      </ActiveLink> */}
      <div className="relative group flex items-center gap-4 text-white font-PPNeueMontreal400 border py-3 px-4 h-[42px] md:h-[49px] leading-[24px] rounded-full">
        <img src={detoxIcon} alt="Detox" className="h-[18px] md:h-[20px] w-[18px]" />
        <span>Detox</span>
        <span className="z-[999] absolute -top-2 left-20 px-2 py-1 text-sm text-black bg-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
          Coming Soon
        </span>
      </div>

      {/* <ActiveLink to="/dashboard/fasting" className="text-white">
        <img src={fastingIcon} alt="Fasting" className="h-[20px] w-[22px]" />
        <span>Fasting</span>
      </ActiveLink> */}
      <div className="relative group flex items-center gap-4 text-white font-PPNeueMontreal400 border py-3 px-4 h-[42px] md:h-[49px] leading-[24px] rounded-full">
        <img src={fastingIcon} alt="Fasting" className="h-[18px] md:h-[20px] w-[20px]" />
        <span>Fasting</span>
        <span className="z-[999] absolute -top-2 left-20 px-2 py-1 text-sm text-black bg-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
          Coming Soon
        </span>
      </div>

      {/* <ActiveLink to="/dashboard/diet" className="text-white">
        <img src={dietIcon} alt="Diet" className="h-[20px] w-[22px]" />
        <span>Diet</span>
      </ActiveLink> */}
      <div className="relative group flex items-center gap-4 text-white font-PPNeueMontreal400 border py-3 px-4 h-[42px] md:h-[49px] leading-[24px] rounded-full">
        <img src={dietIcon} alt="Diet" className="h-[18px] md:h-[20px] w-[20px]" />
        <span>Diet</span>
        <span className="z-[999] absolute -top-2 left-20 px-2 py-1 text-sm text-black bg-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
          Coming Soon
        </span>
      </div>

      {/* <ActiveLink to="/dashboard/biohacking" className="text-white">
        <img
          src={biohackingIcon}
          alt="Biohacking"
          className="h-[20px] w-[22px]"
        />
        <span>Biohacking</span>
      </ActiveLink> */}
      <div className="relative group flex items-center gap-4 text-white font-PPNeueMontreal400 border py-3 px-4 h-[42px] md:h-[49px] leading-[24px] rounded-full">
        <img
          src={biohackingIcon}
          alt="Biohacking"
          className="h-[18px] md:h-[20px] w-[20px]"
        />
        <span>Biohacking</span>
        <span className="z-[999] absolute -top-2 left-20 px-2 py-1 text-sm text-black bg-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
          Coming Soon
        </span>
      </div>

      {/* <ActiveLink to="/dashboard/coaching" className="text-white">
        <img src={coachingIcon} alt="Coaching" className="h-[20px] w-[22px]" />
        <span>Coaching</span>
      </ActiveLink> */}
      <div className="relative group flex items-center gap-4 text-white font-PPNeueMontreal400 border py-3 px-4 h-[42px] md:h-[49px] leading-[24px] rounded-full">
        <img src={coachingIcon} alt="Coaching" className="h-[18px] md:h-[20px] w-[20px]" />
        <span>Coaching</span>
        <span className="z-[999] absolute -top-2 left-20 px-2 py-1 text-sm text-black bg-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
          Coming Soon
        </span>
      </div>

      {/* <ActiveLink to="/dashboard/community" className="text-white">
        <img
          src={communityIcon}
          alt="Community"
          className="h-[20px] w-[22px]"
        />
        <span>Community</span>
      </ActiveLink> */}
      <div className="relative group flex items-center gap-4 text-white font-PPNeueMontreal400 border py-3 px-4 h-[42px] md:h-[49px] leading-[24px] rounded-full">
        <img
          src={communityIcon}
          alt="Community"
          className="h-[18px] md:h-[20px] w-[20px]"
        />
        <span>Community</span>
        <span className="z-[999] absolute -top-2 left-20 px-2 py-1 text-sm text-black bg-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
          Coming Soon
        </span>
      </div>

      {/* <ActiveLink to="/dashboard/store" className="text-white">
        <img src={storeIcon} alt="Store" className="h-[20px] w-[22px]" />
        <span>Store</span>
      </ActiveLink> */}
      <div className="relative group flex items-center gap-4 text-white font-PPNeueMontreal400 border py-3 px-4 h-[42px] md:h-[49px] leading-[24px] rounded-full">
        <img src={storeIcon} alt="Store" className="h-[18px] md:h-[20px] w-[20px]" />
        <span>Store</span>
        <span className="z-[999] absolute -top-2 left-20 px-2 py-1 text-sm text-black bg-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
          Coming Soon
        </span>
      </div>
    </div>
  );
};

export default SidebarItems;
