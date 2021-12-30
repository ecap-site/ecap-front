import Image from "next/image";
import ecap_header from "../../public/ecap-header.png";
import NavbarHome from "../home/navbar";

const Header = () =>{
  return (
    <div className="bg-gray-100 overflow-hidden">
      <div className="mx-auto">
        <Image src={ecap_header} alt="IFC" layout="responsive" />
        <NavbarHome />
        <div className="mx-auto pb-1 bg-gray-100">
        </div>
      </div>
    </div>
  );
};

export default Header;
