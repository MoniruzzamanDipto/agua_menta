import Link from "next/link";
import ImageLoader from "../Image";
import c from "./guide.module.css";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

export default function ProductGuideMenu() {
  const { t } = useTranslation();
  const router = useRouter();
  const menu = [
    {
      image: "/images/size.svg",
      title: t("Size guide"),
      link: "/product-guide-size",
    },
    {
      image: "/images/style.svg",
      title: t("Style guide"),
      link: "/product-style-guide",
    },
    {
      image: "/images/fabrics.svg",
      title: t("Fabrics"),
      link: "/product-guide-fabrics",
    },
  ];

  return (
    <ul className={c.menu}>
      {menu.map((x, i) => (
        <li key={i} className={router.asPath === x.link ? c.active : ""}>
          <Link href={x.link}>
            <ImageLoader src={x.image} alt="size" width={30} height={30} />
            <span>{x.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
