import "./cards.css";
import Image from "next/image";
import next from "../../../public/arrow.png";
import Link from "next/link";

export default function Card({ title, description, color, isBasic, img }) {
  return (
    <div className="Card">
      <div className={`background ${color}`}></div>
      <div className="content">
        <h1 className="title">{title}</h1>
        <div className="description">
          <p>{description}</p>
          <Link className="next" href={isBasic ? "/basic" : "/extended"}>
            <Image className="icons_next" src={next} alt="next icon" />
          </Link>
        </div>
        <Image className="icon" src={img} alt="icon" />
      </div>
    </div>
  );
}
