import DashboardNavbar from "@/components/dashboardComponents/navbar/DashboardNavbar";
import Sidebar from "@/components/dashboardComponents/sidebar/Sidebar";
import ClubALanuchBanner from "@/components/WrapperComponent/ClubALanuchBanner";
import React from "react";

const Dashboardlayout = ({ children }: { children: React.ReactNode }) => {
    return (
        
        <div>
            {/* <ClubALanuchBanner/> */}
            <div className="flex flex-row ">
                <div>
                    <Sidebar />
                </div>
                <div className="w-full">
                    <DashboardNavbar />
                    <div>{children}</div>
                </div>
            </div>
        </div>
    );
};

export default Dashboardlayout;
