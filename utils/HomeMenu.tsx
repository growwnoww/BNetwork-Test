


interface MenuItem {

  title: string;
  link: string;
 
}

const HomeMenu:MenuItem[] = [
    {
        title: "Home",
        link: "/",
    },
    {
        title: "Statistics",
        link: "/#statistics",
    },
    {
        title: "Roadmap",
        link: "/#roadmap",
    },
    {
        title: "How it works",
        link: "/howitworks",
    },
    {
        title:"Smart Contract",
        link:"/smartcontractinfo"
    },
    {
        title: "FAQ",
        link: "/#faq",
    },
 

];

export { HomeMenu };
